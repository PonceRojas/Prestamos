import React from "react";
import { TextField, Grid, InputAdornment, Box, Typography } from "@mui/material";

const FormFields = ({ form, handleChange, errors }) => {
  return (
    <>
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
              startAdornment: (
                <InputAdornment position="start">Bs.</InputAdornment>
              ),
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
        <Grid item xs={12} sm={6}>
  <TextField
    label="Interés mensual (%)"
    name="interes"
    type="number"
    value={form.interes}
    onChange={handleChange}
    fullWidth
    placeholder="Ej. 5"
  />
</Grid>
      </Grid>

      {/* 🔹 Apartado independiente de Detalles (fuera del Grid, ancho completo) */} 
      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
          📝 Detalles
        </Typography>
        <TextField
          label="Detalles"
          name="detalles"
          value={form.detalles}
          onChange={handleChange}
          multiline
          fullWidth
          minRows={8}
          
        />
      </Box>
    </>
  );
};

export default FormFields;
