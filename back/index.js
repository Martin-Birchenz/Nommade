import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { getConnection } from "./db/database.js";
dotenv.config({ debug: true });
const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(
  cors({
    origin: ["http://127.0.0.1:5500", "http://127.0.0.1:5501"],
  }),
);

// Puerto
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Listening in port ${PORT}!`);
});

// Rutas
app.get("/", async (req, res) => {
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
