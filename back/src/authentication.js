import bcryptjs from "bcryptjs";
import jsonWebToken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Simulador de usuario momentáneo
export const usuarios = [
  {
    user: "Martin",
    email: "birchenzmartin@gmail.com",
    password: "1234",
  },
  {
    user: "Alcides",
    email: "birchenzalcides@gmail.com",
    password: "12345",
  },
  {
    user: "Pau",
    email: "birchenzpau@gmail.com",
    password: "123456",
  },
];

async function login(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    return res
      .status(400)
      .send({ status: "Error", message: "Los campos están incompletos" });
  }

  const usuario = usuarios.find((usuario) => usuario.user === user);
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
    procces.env.JWT_SECRET,
    { expiresIn: procces.env.JWT_EXP },
  );

  const cookieOption = {
    expires: new Date(
      Date.now() + procces.env.JWT_COOKIE_EXP * 24 * 60 * 60 * 1000,
    ),
    path: "/",
  };
  res.cookie("jwt", token, cookieOption);
  res.send({ status: "ok", message: "Usuario loggeado", redirect: "/" });
}

async function register(req, res) {
  console.log(req.body);
  const user = req.body.user;
  const email = req.body.email;
  const password = req.body.password;
  if (!user || !email || !password) {
    return res
      .status(400)
      .send({ status: "Error", message: "Los campos están incompletos" });
  }

  const usuario = usuarios.find((usuario) => usuario, user === user);
  if (usuario) {
    return res
      .status(400)
      .send({ status: "Error", message: "Este usuario ya existe" });
  }

  const salt = bcryptjs.genSalt(5);
  const hashPass = bcryptjs.hash(password, salt);
  const nuevoUser = {
    user,
    email,
    password: hashPass,
  };
  console.log(nuevoUser);
  usuarios.push(nuevoUser);
  return res
    .status(201)
    .send({ status: "ok", message: "Usuario agregado", redirect: "/" });
}

export const methods = {
  login,
  register,
};
