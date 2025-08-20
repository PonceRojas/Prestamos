import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";

const PrestamoForm = ({ open, onClose, onSave, prestamo }) => {
  const [form, setForm] = useState({
    cliente: prestamo?.cliente || "",
    monto: prestamo?.monto || "",
    fecha: prestamo?.fecha || "",
    estado: prestamo?.estado || "Pendiente",
    celular: prestamo?.celular || "",
    carnet: prestamo?.carnet || "",
    contactoFamiliar: prestamo?.contactoFamiliar || "",
    detalles: prestamo?.detalles || "",
    foto: prestamo?.foto || null, // Guardaremos como URL o File
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, foto: URL.createObjectURL(file) }); // Preview de la imagen
    }
  };

  const handleSave = () => onSave(form);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{prestamo ? "Editar Préstamo" : "Nuevo Préstamo"}</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
        <TextField label="Cliente" name="cliente" value={form.cliente} onChange={handleChange} fullWidth />
        <TextField label="Carnet" name="carnet" value={form.carnet} onChange={handleChange} fullWidth />
        <TextField label="Celular" name="celular" type="tel" value={form.celular} onChange={handleChange} fullWidth />
        <TextField label="Contacto Familiar" name="contactoFamiliar" value={form.contactoFamiliar} onChange={handleChange} fullWidth />
        <TextField label="Monto" name="monto" type="number" value={form.monto} onChange={handleChange} fullWidth />
        <TextField label="Fecha" name="fecha" type="date" value={form.fecha} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} />
        <TextField select label="Estado" name="estado" value={form.estado} onChange={handleChange} fullWidth>
          {["Pendiente", "Aprobado", "Rechazado"].map((e) => (
            <MenuItem key={e} value={e}>{e}</MenuItem>
          ))}
        </TextField>
        <TextField label="Detalles" name="detalles" value={form.detalles} onChange={handleChange} multiline rows={3} fullWidth />
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {form.foto && <img src={form.foto} alt="Cliente" style={{ width: 100, height: 100, marginTop: 10, objectFit: "cover" }} />}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleSave}>Guardar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PrestamoForm;
