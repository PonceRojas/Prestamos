import React, { useState, useEffect } from "react";
import { Paper, Grid, Typography, Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

import solicitarService from "./solicitarService";
import SolicitarForm from "./components/SolicitarForm";
import SolicitarTable from "./components/SolicitarTable";

const SolicitarPrestamo = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    solicitarService.fetchAll().then(setSolicitudes).catch(console.error);
  }, []);

  const handleSave = async (form) => {
    const created = await solicitarService.create({ ...form, estado: "Pendiente" });
    setSolicitudes([...solicitudes, created]);
    setFormOpen(false);
  };

  const handleAccept = async (s) => {
    const updated = await solicitarService.update(s.id, { ...s, estado: "Aprobado" });
    setSolicitudes(solicitudes.map(x => x.id === s.id ? updated : x));
  };

  const handleReject = async (s) => {
    const updated = await solicitarService.update(s.id, { ...s, estado: "Rechazado" });
    setSolicitudes(solicitudes.map(x => x.id === s.id ? updated : x));
  };

  return (
    <Paper elevation={3} sx={{ p: 4, m: 2, borderRadius: "12px" }}>
      <Grid container spacing={3} alignItems="center" mb={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "primary.main" }}>
            Solicitar Préstamo
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Llena los datos de tu préstamo para enviar la solicitud.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: { xs: "flex-start", md: "flex-end" }, gap: 2 }}>
          <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => setFormOpen(true)}>
            Nueva Solicitud
          </Button>
        </Grid>
      </Grid>
      <SolicitarTable solicitudes={solicitudes} onAccept={handleAccept} onReject={handleReject} />
      <SolicitarForm open={formOpen} onClose={() => setFormOpen(false)} onSave={handleSave} />
    </Paper>
  );
};

export default SolicitarPrestamo;
