import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: "localhost",
  user: "root",         // tu usuario de MySQL
  password: "",         // tu contraseña de MySQL
  database: "prueba",  // tu base de datos
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
  