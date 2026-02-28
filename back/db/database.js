import mysql from "promise-mysql";
import dotenv from "dotenv";

dotenv.config();

const getConnection = async () => {
  return await mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 8080,
  });
};

export { getConnection };
