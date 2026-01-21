import bcryptjs from "bcryptjs";
import jsonWebToken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Simulador de usuario momentáneo
export const usuarios = [
  {
    user: "Usuario",
    email: "usuario@gmail.com",
    password: "$2b$05$ri6s6UOEWF8wudF5rquX0OTGQ.XGFHBpeWFOcIkaX/y8xJCV/nCtK",
  },
];

const expira = parseInt(process.env.JWT_COOKIE_EXP) || 1;

async function login(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    return res
      .status(400)
      .send({ status: "Error", message: "Los campos están incompletos" });
  }

  const usuario = usuarios.find((usuario) => usuario.email === email);
  if (!usuario) {
    return res
      .status(400)
      .send({ status: "Error", message: "Error durante login" });
  }
  const loginCorrecto = await bcryptjs.compare(password, usuario.password);
  if (!loginCorrecto) {
    return res
      .status(400)
      .send({ status: "Error", message: "Error durante login" });
  }
  const token = jsonWebToken.sign(
    { user: usuario.user },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXP },
  );

  const cookieOption = {
    expires: new Date(Date.now() + expira * 24 * 60 * 60 * 1000),
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  };

  console.log("Seteando cookie con opciones: ", cookieOption);

  res.cookie("jwt", token, cookieOption);

  res.send({
    status: "ok",
    message: "Usuario loggeado",
    redirect: "../../index.html",
  });
}

async function register(req, res) {
  const { user, email, password } = req.body;
  if (!user || !email || !password) {
    return res
      .status(400)
      .send({ status: "Error", message: "Los campos están incompletos" });
  }

  const usuario = usuarios.find((usuario) => usuario.user === user);
  if (usuario) {
    return res
      .status(400)
      .send({ status: "Error", message: "Este usuario ya existe" });
  }

  const salt = await bcryptjs.genSalt(5);

  const hashPass = await bcryptjs.hash(password, salt);

  const nuevoUser = {
    user,
    email,
    password: hashPass,
  };

  console.log(nuevoUser);

  usuarios.push(nuevoUser);

  const token = jsonWebToken.sign(
    { user: nuevoUser.user },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXP },
  );

  const cookieOption = {
    expires: new Date(Date.now() + expira * 24 * 60 * 60 * 1000),
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
    redirect: "../../index.html",
  });
}

export const methods = {
  login,
  register,
};
