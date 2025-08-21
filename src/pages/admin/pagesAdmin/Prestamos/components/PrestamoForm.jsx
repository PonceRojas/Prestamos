import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Grid,
  IconButton,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

const PrestamoForm = ({ open, onClose, onSave, prestamo }) => {
  const [form, setForm] = useState({
    cliente: prestamo?.cliente || "",
    monto: prestamo?.monto || "",
    fecha: prestamo?.fecha || "",
    celular: prestamo?.celular || "",
    carnet: prestamo?.carnet || "",
    contactoFamiliar: prestamo?.contactoFamiliar || "",
    detalles: prestamo?.detalles || "",
    fotos: prestamo?.fotos || [], // Array de URLs temporales
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const fileUrls = files.map(f => URL.createObjectURL(f));
    setForm({ ...form, fotos: [...form.fotos, ...fileUrls] });
  };

  const handleRemovePhoto = (url) => {
    setForm({ ...form, fotos: form.fotos.filter(f => f !== url) });
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
        <TextField label="Detalles" name="detalles" value={form.detalles} onChange={handleChange} multiline rows={3} fullWidth />

        {/* Subir varias fotos */}
        <Button variant="outlined" component="label">
          Subir Fotos
          <input type="file" accept="image/*" hidden multiple onChange={handleFileChange} />
        </Button>
        <Grid container spacing={1} mt={1}>
          {form.fotos.map((url, idx) => (
            <Grid item key={idx}>
              <div style={{ position: "relative" }}>
                <img src={url} alt={`Foto ${idx}`} style={{ width: 70, height: 70, objectFit: "cover", borderRadius: 4 }} />
                <IconButton
                  size="small"
                  sx={{ position: "absolute", top: -8, right: -8, background: "white" }}
                  onClick={() => handleRemovePhoto(url)}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </div>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleSave}>Guardar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PrestamoForm;
