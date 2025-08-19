// backend/routes/authRoutes.js
import express from "express";
import { pool } from "../db/connection.js";
import bcrypt from "bcrypt";

const router = express.Router();

// Login de usuario
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const [rows] = await pool.query(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: "Usuario o contraseña incorrectos" });
    }

    const user = rows[0];
    // Devolver datos sin password
    res.json({ id: user.id, username: user.username, email: user.email });
  } catch (err) {
    console.error("Error en login:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
});


export default router;
