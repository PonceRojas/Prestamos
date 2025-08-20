import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";

const SolicitarForm = ({ open, onClose, onSave }) => {
  const [form, setForm] = useState({ monto: "", plazo: "", motivo: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSave = () => {
    if (!form.monto || !form.plazo || !form.motivo) return alert("Todos los campos son obligatorios");
    onSave(form);
    setForm({ monto: "", plazo: "", motivo: "" });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Solicitar Préstamo</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
        <TextField label="Monto" name="monto" type="number" value={form.monto} onChange={handleChange} fullWidth />
        <TextField label="Plazo (meses)" name="plazo" type="number" value={form.plazo} onChange={handleChange} fullWidth />
        <TextField label="Motivo" name="motivo" multiline rows={3} value={form.motivo} onChange={handleChange} fullWidth />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleSave}>Enviar Solicitud</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SolicitarForm;
