import express from "express";
import fs from "fs";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { getConnection } from "./db/database.js";
import { methods as authentication } from "./src/authentication.js";
import { methods as authorization } from "./src/authorization.js";

dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(
  cors({
    origin: process.env.PUBLIC_URL || true,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../front")));
app.use("/style", express.static(path.join(__dirname, "../front/style")));
app.use("/js", express.static(path.join(__dirname, "../front/js")));
app.use("/public", express.static(path.join(__dirname, "../front/public")));
app.use(
  "/pages/sesion",
  express.static(path.join(__dirname, "../front/pages/sesion")),
);
app.use((req, res, next) => {
  console.log(`Petición recibida: ${req.method} ${req.url}`);
  next();
});

// Puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening in port ${PORT}! http://localhost:${PORT}/login`);
});

// Rutas
app.get("/", authorization.admin, async (req, res) => {
  res.sendFile(path.join(__dirname, "../front/home.html"));
});

app.get("/productos", authorization.admin, async (req, res) => {
  const connection = await getConnection();
  const result = await connection.query("SELECT * from productosnommade");
  res.json(result);
});

app.get("/tienda", authorization.admin, (req, res) => {
  res.sendFile(path.join(__dirname, "../front/pages/tienda.html"));
});

app.get("/nosotros", authorization.admin, (req, res) => {
  res.sendFile(path.join(__dirname, "../front/pages/nosotros.html"));
});

app.get("/pagos", authorization.admin, (req, res) => {
  res.sendFile(path.join(__dirname, "../front/pages/pagos.html"));
});

app.get("/compras", authorization.admin, (req, res) => {
  res.sendFile(path.join(__dirname, "../front/pages/compras.html"));
});

app.get("/pagos", authorization.admin, (req, res) => {
  res.sendFile(path.join(__dirname, "../front/pages/pagos.html"));
});

app.get("/productosInicio", async (req, res) => {
  const connection = await getConnection();
  const result = await connection.query(
    "SELECT * FROM productosnommade LIMIT 3",
  );
  res.json(result);
});

app.get("/promociones", async (req, res) => {
  const connection = await getConnection();
  const result = await connection.query("SELECT * FROM promocionesnommade");
  res.json(result);
});

app.post("/carrito/comprar", async (req, res) => {
  if (req.body && req.body.length > 0) {
    return res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
});

app.get("/login", authorization.publico, (req, res) => {
  res.sendFile(path.join(__dirname, "../front/pages/sesion/login.html"));
});

app.get("/register", authorization.publico, (req, res) => {
  res.sendFile(path.join(__dirname, "../front/pages/sesion/register.html"));
});

app.post("/register", authentication.register);
app.post("/login", authentication.login);
app.post("/logout", authentication.logout);
