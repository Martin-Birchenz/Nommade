import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQLHOST || process.env.MYSQLHOST.env.DB_HOST,
    database: process.env.MYSQLDATABASE  || process.env.MYSQLDATABASE.env.DB_DATABASE,
    user: process.env.MYSQLUSER  || process.env.MYSQLUSER.env.DB_USER,
    password: process.env.MYSQLPASSWORD  || process.env.MYSQLPASSWORD.env.DB_PASSWORD,
    port: process.env.MYSQLPORT || 3306 || process.env.MYSQLPORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

export async function getConnection() {
  return await pool.getConnection()
}