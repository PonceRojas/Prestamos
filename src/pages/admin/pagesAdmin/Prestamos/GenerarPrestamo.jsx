import React, { useState, useEffect } from "react";
import { Paper, Grid, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Box } from "@mui/material";
import { Add as AddIcon, Close as CloseIcon } from "@mui/icons-material";

import prestamoService from "./prestamoService";
import solicitarService from "../SolicitudPrestamo/solicitarService";

import PrestamoSearch from "./components/PrestamoSearch";
import PrestamoTable from "./components/PrestamoTable";
import PrestamoForm from "./components/PrestamoForm";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const PedirPrestamo = () => {
  const [prestamos, setPrestamos] = useState([]);
  const [solicitudes, setSolicitudes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  // Modal de detalles
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedPrestamo, setSelectedPrestamo] = useState(null);

  useEffect(() => {
    prestamoService.fetchAll().then(setPrestamos).catch(console.error);
    solicitarService.fetchAll()
      .then(data => setSolicitudes(data.filter(s => s.estado === "Pendiente")))
      .catch(console.error);
  }, []);

  const filteredPrestamos = prestamos.filter(p =>
    p.cliente.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => { setEditing(null); setFormOpen(true); };
  const handleEdit = (p) => { setEditing(p); setFormOpen(true); };

  const handleView = (p) => {
    setSelectedPrestamo(p);
    setDetailsOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar préstamo?")) {
      await prestamoService.delete(id);
      setPrestamos(prestamos.filter(p => p.id !== id));
    }
  };

  const handleSave = async (form) => {
    if (editing) {
      const updated = await prestamoService.update(editing.id, form);
      setPrestamos(prestamos.map(p => (p.id === updated.id ? updated : p)));
    } else {
      const created = await prestamoService.create(form);
      setPrestamos([...prestamos, created]);
    }
    setFormOpen(false);
  };

  const handleAceptarSolicitud = async (solicitud) => {
    if(window.confirm("¿Aceptar esta solicitud?")){
      const prestamoCreado = await prestamoService.aceptarSolicitud(solicitud);
      setPrestamos([...prestamos, prestamoCreado]);
      setSolicitudes(solicitudes.filter(s => s.id !== solicitud.id));
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, m: 2, borderRadius: "12px" }}>
      <Grid container spacing={3} alignItems="center" mb={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "primary.main" }}>
            Gestión de Préstamos
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Administra los préstamos de tus clientes de manera eficiente.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: { xs: "flex-start", md: "flex-end" }, gap: 2 }}>
          <PrestamoSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleAdd}>
            Nuevo Préstamo
          </Button>
        </Grid>
      </Grid>

      {solicitudes.length > 0 && (
        <Paper sx={{ p: 2, mb: 4, borderRadius: "12px" }}>
          <Typography variant="h6" gutterBottom>Solicitudes Pendientes</Typography>
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: "primary.light" }}>
                <TableRow>
                  <TableCell>Cliente</TableCell>
                  <TableCell>Monto</TableCell>
                  <TableCell>Plazo</TableCell>
                  <TableCell>Motivo</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {solicitudes.map(s => (
                  <TableRow key={s.id}>
                    <TableCell>{s.cliente}</TableCell>
                    <TableCell>{s.monto}</TableCell>
                    <TableCell>{s.plazo}</TableCell>
                    <TableCell>{s.motivo}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="success" onClick={() => handleAceptarSolicitud(s)}>
                        Aceptar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      {/* Tabla de préstamos sin detalles ni estado */}
      <PrestamoTable prestamos={filteredPrestamos} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} />

      {/* Formulario */}
      <PrestamoForm open={formOpen} onClose={() => setFormOpen(false)} onSave={handleSave} prestamo={editing} />

      {/* Modal de detalles */}
      {selectedPrestamo && (
        <Dialog open={detailsOpen} onClose={() => setDetailsOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>
            Detalles del Préstamo
            <IconButton
              aria-label="cerrar"
              onClick={() => setDetailsOpen(false)}
              sx={{ position: "absolute", right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <Typography><strong>Cliente:</strong> {selectedPrestamo.cliente}</Typography>
            <Typography><strong>Carnet:</strong> {selectedPrestamo.carnet}</Typography>
            <Typography><strong>Celular:</strong> {selectedPrestamo.celular}</Typography>
            <Typography><strong>Contacto Familiar:</strong> {selectedPrestamo.contactoFamiliar}</Typography>
            <Typography><strong>Monto:</strong> {selectedPrestamo.monto}</Typography>
            <Typography><strong>Fecha:</strong> {selectedPrestamo.fecha}</Typography>
            <Typography><strong>Detalles:</strong> {selectedPrestamo.detalles}</Typography>

            {/* Fotos */}
            {selectedPrestamo.fotos && selectedPrestamo.fotos.length > 0 && (
              <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
                {selectedPrestamo.fotos.map((url, idx) => (
                  <img key={idx} src={url} alt={`Foto ${idx}`} style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 4, cursor: "pointer" }} onClick={() => window.open(url, "_blank")} />
                ))}
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDetailsOpen(false)}>Cerrar</Button>
          </DialogActions>
        </Dialog>
      )}
    </Paper>
  );
};

export default PedirPrestamo;
