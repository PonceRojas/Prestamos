// backend/routes/userRoutes.js
import express from "express";
import { pool } from "../db/connection.js";
import bcrypt from "bcrypt";

const router = express.Router();

//  Obtener todos los usuarios (sin contraseñas)
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, username, email FROM users ORDER BY id DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error("Error al obtener usuarios:", err);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

//  Crear un nuevo usuario (con contraseña encriptada)
router.post("/", async (req, res) => {
  try {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    // Verificar si ya existe
    const [exists] = await pool.query(
      "SELECT id FROM users WHERE username = ? OR email = ?",
      [username, email]
    );
    if (exists.length > 0) {
      return res.status(409).json({ error: "El usuario o email ya existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO users (username, password, email) VALUES (?, ?, ?)",
      [username, hashedPassword, email]
    );

    res.json({ success: true, message: "Usuario creado con éxito" });
  } catch (err) {
    console.error("Error al crear usuario:", err);
    res.status(500).json({ error: "Error al crear usuario" });
  }
});

//  Eliminar usuario por ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json({ success: true, message: "Usuario eliminado correctamente" });
  } catch (err) {
    console.error("Error al eliminar usuario:", err);
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
});

export default router;
