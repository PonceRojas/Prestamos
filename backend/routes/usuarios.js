import express from "express";
import { pool } from "../db/connection.js";// tu conexión mysql

const router = express.Router();

// Obtener todos los usuarios administrativos
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM usuarios");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear usuario
router.post("/", async (req, res) => {
  const { name, email, role, status, avatar } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO usuarios (name, email, role, status, avatar) VALUES (?, ?, ?, ?, ?)",
      [name, email, role, status, avatar]
    );
    res.json({ id: result.insertId, name, email, role, status, avatar });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Eliminar usuario
router.delete("/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM usuarios WHERE id = ?", [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
