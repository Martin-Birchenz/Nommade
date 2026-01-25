import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { getConnection } from "./db/database.js";
dotenv.config({ debug: true });
const app = express();
import { methods as authentication } from "./src/authentication.js";
import { methods as authorization } from "./src/authorization.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5500",
      "http://127.0.0.1:5500",
      "http://127.0.0.1:5501",
      "http://localhost:5501",
      "http://127.0.0.1:3000",
      "http://localhost:3000",
    ],
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../front")));

// Puerto
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Listening in port ${PORT}! http://localhost:3000/login`);
});

// Rutas
app.get("/", authorization.publico, async (req, res) => {});

app.get("/productos", async (req, res) => {
  const connection = await getConnection();
  const result = await connection.query("SELECT * from productos");
  res.json(result);
});

app.post("/carrito/comprar", async (req, res) => {
  if (req.body && req.body.length > 0) {
    return res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../front/pages/sesion/login.html"));
});

app.post("/register", authentication.register);
app.post("/login", authentication.login);
app.post("/logout", authentication.logout);
