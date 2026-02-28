import bcryptjs from "bcryptjs";
import jsonWebToken from "jsonwebtoken";
import dotenv from "dotenv";
import { getConnection } from "../db/database.js";

dotenv.config();

async function login(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  console.log("INTENTO DE LOGIN");
  console.log("EMAIL RECIBIDO: ", email);

  if (!email || !password) {
    return res
      .status(400)
      .send({ status: "Error", message: "Los campos están incompletos" });
  }

  try {
    console.log("CONECTANDO A LA BASE DE DATOS");
    const connection = await getConnection();
    console.log("CONEXIÓN EXITOSA");
    const [usuarios] = await connection.query(
      "SELECT * FROM usuariosnommade WHERE email = ?",
      [email],
    );
    const usuario = usuarios[0];

    if (!usuario || !(await bcryptjs.compare(password, usuario.pass))) {
      return res
        .status(400)
        .send({ status: "Error", message: "Error durante login" });
    }

    const secret = process.env.JWT_SECRET || "clave";

    const token = jsonWebToken.sign({ user: usuario.user }, secret, {
      expiresIn: "1d",
    });

    const cookieOption = {
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      path: "/",
      httpOnly: true,
      sameSite: "none",
      secure: true,
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
    console.log(error);
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

    const [usuarioExiste] = await connection.query(
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

    const secret = process.env.JWT_SECRET || "clave";

    const token = jsonWebToken.sign({ user: user }, secret, {
      expiresIn: "1d",
    });

    const cookieOption = {
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      path: "/",
      httpOnly: true,
      sameSite: "none",
      secure: true,
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
    sameSite: "none",
    secure: true,
  });

  return res.status(200).send({ status: "ok", message: "Sesión cerrada" });
}

export const methods = {
  login,
  register,
  logout,
};
