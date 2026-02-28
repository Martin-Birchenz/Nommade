import mysql from "promise-mysql";
import dotenv from "dotenv";

dotenv.config();

const getConnection = async () => {
  const connection = process.env.MYSQL_URL || {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 3306,
  };
  return await mysql.createConnection(connection);
};

export { getConnection };
