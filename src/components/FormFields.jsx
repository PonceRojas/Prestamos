import React from "react";
import { TextField, Grid, InputAdornment } from "@mui/material";

const FormFields = ({ form, handleChange, errors }) => {
  return (
    <Grid container spacing={2}>
      {/* Campos de 50% de ancho en pantallas grandes */}
      <Grid item xs={12} sm={6}>
        <TextField
          label="Cliente"
          name="cliente"
          value={form.cliente}
          onChange={handleChange}
          fullWidth
          required
          error={!!errors.cliente}
          helperText={errors.cliente}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Carnet"
          name="carnet"
          value={form.carnet}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Celular"
          name="celular"
          type="tel"
          value={form.celular}
          onChange={handleChange}
          fullWidth
          required
          error={!!errors.celular}
          helperText={errors.celular}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Contacto Familiar"
          name="contactoFamiliar"
          value={form.contactoFamiliar}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Monto"
          name="monto"
          type="number"
          value={form.monto}
          onChange={handleChange}
          fullWidth
          required
          error={!!errors.monto}
          helperText={errors.monto}
          InputProps={{
            startAdornment: <InputAdornment position="start">Bs.</InputAdornment>,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Fecha"
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
      
      {/* Campo de Detalles de 100% de ancho */}
      <Grid item xs={12}>
        <TextField
          label="Detalles"
          name="detalles"
          value={form.detalles}
          onChange={handleChange}
          multiline
          rows={5}
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default FormFields;