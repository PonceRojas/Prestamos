import express from "express";
import db from "../db.js";

const router = express.Router();

// Crear solicitud de préstamo
router.post("/", async (req, res) => {
  try {
    const { prestatario_id, monto, plazo, motivo } = req.body;

    // Validaciones simples
    if (!monto || !plazo) {
      return res.status(400).json({ error: "Monto y plazo son obligatorios" });
    }

    const [result] = await db.query(
      "INSERT INTO prestamos (prestatario_id, monto, plazo, motivo) VALUES (?, ?, ?, ?)",
      [prestatario_id, monto, plazo, motivo]
    );

    res.json({ id: result.insertId, prestatario_id, monto, plazo, motivo, estado: "pendiente" });
  } catch (err) {
    res.status(500).json({ error: "Error al crear préstamo", details: err });
  }
});

// Listar marketplace de préstamos (pendientes)
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT p.*, pr.nombre AS prestatario FROM prestamos p JOIN prestatarios pr ON p.prestatario_id = pr.id WHERE p.estado = 'pendiente'"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener préstamos", details: err });
  }
});

export default router;
