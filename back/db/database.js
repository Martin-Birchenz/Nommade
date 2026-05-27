import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || process.env.MYSQLHOST,
    database: process.env.DB_DATABASE  || process.env.MYSQLDATABASE,
    user: process.env.DB_USER  || process.env.MYSQLUSER,
    password: process.env.DB_PASSWORD  || process.env.MYSQLPASSWORD,
    port: parseInt(process.env.DB_PORT || process.env.MYSQLPORT || 3306),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

export async function getConnection() {
  return await pool.getConnection()
}