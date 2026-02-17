import bcryptjs from "bcryptjs";
import jsonWebToken from "jsonwebtoken";
import dotenv from "dotenv";
import { getConnection } from "../db/database.js";

dotenv.config();

async function login(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res
      .status(400)
      .send({ status: "Error", message: "Los campos están incompletos" });
  }

  try {
    const connection = await getConnection();
    const usuarios = await connection.query(
      "SELECT * FROM usuariosnommade WHERE email = ?",
      [email],
    );
    const usuario = usuarios[0];

    if (!usuario || !(await bcryptjs.compare(password, usuario.pass))) {
      return res
        .status(400)
        .send({ status: "Error", message: "Error durante login" });
    }

    const expira = parseInt(process.env.JWT_COOKIE_EXP) || 1;

    const token = jsonWebToken.sign(
      { user: usuario.user },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    const cookieOption = {
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    };

    console.log("Seteando cookie con opciones: ", cookieOption);

    console.log("Cookie seteada correctamente para: ", usuario.user);

    res.cookie("jwt", token, cookieOption);

    res.send({
      status: "ok",
      message: "Usuario loggeado",
      redirect: "/",
    });
  } catch (error) {
    res.status(500).send({ status: "Error", message: "Error en el servidor" });
  }
}

async function register(req, res) {
  const { user, email, password } = req.body;

  if (!user || !email || !password) {
    return res
      .status(400)
      .send({ status: "Error", message: "Todos los campos son obligatorios" });
  }

  try {
    const connection = await getConnection();

    const usuarioExiste = await connection.query(
      "SELECT * FROM usuariosnommade WHERE user = ?",
      [user],
    );

    if (usuarioExiste.length > 0) {
      return res
        .status(400)
        .send({ status: "Error", message: "Este usuario ya existe" });
    }

    const salt = await bcryptjs.genSalt(5);

    const hashPass = await bcryptjs.hash(password, salt);

    await connection.query(
      "INSERT INTO usuariosnommade (user, email, pass) VALUES (?, ?, ?)",
      [user, email, hashPass],
    );

    const expira = parseInt(process.env.JWT_COOKIE_EXP) || 1;

    const token = jsonWebToken.sign({ user: user }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const cookieOption = {
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    };

    console.log("Seteando cookie con opciones: ", cookieOption);

    res.cookie("jwt", token, cookieOption);

    return res.status(201).send({
      status: "ok",
      message: "Usuario agregado",
      redirect: "/",
    });
  } catch (error) {
    console.log(error);
  }
}

async function logout(req, res) {
  res.clearCookie("jwt", {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });

  return res.status(200).send({ status: "ok", message: "Sesión cerrada" });
}

export const methods = {
  login,
  register,
  logout,
};
