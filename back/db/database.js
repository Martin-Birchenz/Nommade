import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || process.env.MYSQLHOST,
    database: process.env.DB_DATABASE  || process.env.MYSQLDATABASE,
    user: process.env.DB_USER  || process.env.MYSQLUSER,
    password: process.env.DB_PASSWORD  || process.env.MYSQLPASSWORD,
    port: process.env.DB_PORT || 3306 || process.env.MYSQLPORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

export async function getConnection() {
  return await pool.getConnection()
}