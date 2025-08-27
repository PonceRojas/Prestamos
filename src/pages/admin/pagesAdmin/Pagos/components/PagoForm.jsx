// src/pages/admin/pagesAdmin/Pagos/components/PagoForm.jsx
import React, { useEffect, useMemo, useState } from "react";
import { TextField, Grid, MenuItem, Box, Typography, InputAdornment, Stack, Button } from "@mui/material";
import ModalReutilizable from "../../../../../shared/componentes/modal/modal";

const METODOS = ["Efectivo", "Transferencia", "Tarjeta", "QR"];

export default function PagoForm({ open, onClose, onSave, prestamo }) {
  const saldoActual = useMemo(() => {
    if (!prestamo) return 0;
    return typeof prestamo.saldo === "number" ? prestamo.saldo : Number(prestamo.monto) || 0;
  }, [prestamo]);

  const [form, setForm] = useState({
    prestamoId: "",
    cliente: "",
    monto: "",
    fecha: "",
    metodo: "Efectivo",
    referencia: "",
    notas: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (prestamo) {
      setForm((f) => ({
        ...f,
        prestamoId: prestamo.id,
        cliente: prestamo.cliente || "",
        fecha: new Date().toISOString().slice(0, 10),
      }));
      setErrors({});
    }
  }, [prestamo, open]);

  const validate = () => {
    const e = {};
    if (!form.monto || Number(form.monto) <= 0) e.monto = "Monto inválido";
    if (Number(form.monto) > saldoActual) e.monto = `No puede exceder el saldo (Bs. ${saldoActual})`;
    if (!form.fecha) e.fecha = "Fecha requerida";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setErrors((er) => ({ ...er, [name]: "" }));
  };

  const handleSave = () => {
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length === 0) onSave(form);
  };

  return (
    <ModalReutilizable open={open} onClose={onClose} title="Registrar pago">
      {prestamo && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Préstamo de <strong>{prestamo.cliente}</strong> — Monto: <strong>Bs. {prestamo.monto}</strong> — Saldo:{" "}
            <strong>Bs. {saldoActual}</strong> — Fecha: {prestamo.fecha}
          </Typography>
        </Box>
      )}

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Monto a pagar"
            name="monto"
            type="number"
            value={form.monto}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.monto}
            helperText={errors.monto}
            InputProps={{ startAdornment: <InputAdornment position="start">Bs.</InputAdornment> }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Fecha de pago"
            name="fecha"
            type="date"
            value={form.fecha}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.fecha}
            helperText={errors.fecha}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField select label="Método" name="metodo" value={form.metodo} onChange={handleChange} fullWidth>
            {METODOS.map((m) => (
              <MenuItem key={m} value={m}>{m}</MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Referencia (opcional)" name="referencia" value={form.referencia} onChange={handleChange} fullWidth />
        </Grid>
      </Grid>

      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>📝 Notas</Typography>
        <TextField
          label="Notas"
          name="notas"
          value={form.notas}
          onChange={handleChange}
          fullWidth
          multiline
          minRows={4}
          sx={{ "& textarea": { minHeight: 25 } }}
        />
      </Box>

      {/* ✅ Botones visibles siempre (aunque ModalReutilizable no soporte 'actions') */}
      <Stack direction="row" spacing={1} justifyContent="flex-end" sx={{ mt: 3 }}>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleSave}>Guardar</Button>
      </Stack>
    </ModalReutilizable>
  );
}
