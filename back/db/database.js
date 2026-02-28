import mysql from "promise-mysql";
import dotenv from "dotenv";

dotenv.config();

const getConnection = async () => {
  const connection = process.env.MYSQL_URL || {
    host: process.env.MYSQLHOST || process.env.DB_HOST,
    database: process.env.MYSQLDATABASE || process.env.DB_DATABASE,
    user: process.env.MYSQLUSER || process.env.DB_USER,
    password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD,
    port: process.env.MYSQLPORT || 3306,
  };
  return await mysql.createConnection(connection);
};

export { getConnection };
