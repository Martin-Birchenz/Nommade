import jsonWebToken from "jsonwebtoken";
import dotenv from "dotenv";
import { usuarios } from "./authentication.js";

dotenv.config();

function admin(req, res, next) {
  const logueado = cookie(req);
  if (logueado) return next();
  return res.redirect("/");
}

function publico(req, res, next) {
  const logueado = cookie(req);
  if (logueado) return next();
  return res.redirect("/admin");
}

function cookie(req) {
  try {
    const cookieJWT = req.headers.cookie
      .split("; ")
      .find((cookie) => cookie.starstWith("jwt="))
      .slice(4);
    console.log("Cookie", cookieJWT);
    const decodificacion = jsonWebToken.verify(
      cookieJWT,
      process.env.JWT_SECRET,
    );
    console.log(decodificacion);
    const usuario = usuarios.find(
      (usuario) => usuario.user === decodificacion.user,
    );
    if (!usuario) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    return false;
  }
}

export const methods = {
  admin,
  publico,
};
