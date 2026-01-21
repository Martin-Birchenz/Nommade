import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { getConnection } from "./db/database.js";
dotenv.config({ debug: true });
const app = express();
import { methods as authentication } from "./src/authentication.js";
import { methods as authorization } from "./src/authorization.js";

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(
  cors({
    origin: ["http://127.0.0.1:5500", "http://127.0.0.1:5501"],
  }),
);
app.use(cookieParser());

// Puerto
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Listening in port ${PORT}!`);
});

// Rutas
app.get("/", authorization.publico, async (req, res) => {
  res.send("Mensaje recibido");
});

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

app.post("/register", authentication.register);
app.post("/login", authentication.login);
