// src/pages/admin/pagesAdmin/Pagos/components/PagoDetails.jsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

export default function PagoDetails({ open, onClose, prestamo }) {
  if (!prestamo) return null;

  const saldo = typeof prestamo.saldo === "number" ? prestamo.saldo : Number(prestamo.monto) || 0;
  const pagos = prestamo.pagos || [];  // Accedemos al campo "pagos" dentro del préstamo

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{ sx: { borderRadius: "16px", p: 2 } }}
    >
      <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>
        📄 Detalles del Préstamo
      </DialogTitle>

      <DialogContent dividers>
        {/* Información general */}
        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} sm={6}>
            <Typography>
              <strong>Cliente:</strong> {prestamo.cliente}
            </Typography>
            <Typography>
              <strong>Carnet:</strong> {prestamo.carnet}
            </Typography>
            <Typography>
              <strong>Celular:</strong> {prestamo.celular}
            </Typography>
            <Typography>
              <strong>Contacto familiar:</strong> {prestamo.contactoFamiliar || "—"}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography>
              <strong>Monto:</strong> {prestamo.monto}
            </Typography>
            <Typography>
              <strong>Fecha:</strong> {prestamo.fecha}
            </Typography>
            <Typography>
              <strong>Estado:</strong> {prestamo.estado || "Pendiente"}
            </Typography>
            <Typography>
              <strong>Interés mensual:</strong> {prestamo.interes}%
            </Typography>
            <Typography>
              <strong>Interés del mes (Bs):</strong> {prestamo.interes > 0 ? (saldo * (prestamo.interes / 100)).toFixed(2) : 0}
            </Typography>
            <Typography>
              <strong>Saldo actual:</strong> Bs. {saldo}
            </Typography>
          </Grid>
        </Grid>

        {/* Historial de pagos */}
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
          Historial de pagos
        </Typography>
        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Fecha</TableCell>
                <TableCell>Método</TableCell>
                <TableCell>Referencia</TableCell>
                <TableCell align="right">Monto</TableCell>
                <TableCell align="right">Saldo después</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pagos.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} sx={{ textAlign: "center" }}>
                    Sin pagos registrados.
                  </TableCell>
                </TableRow>
              ) : (
                pagos.map((p, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{p.fecha}</TableCell>
                    <TableCell>{p.metodo}</TableCell>
                    <TableCell>{p.referencia || "—"}</TableCell>
                    <TableCell align="right">Bs. {p.monto}</TableCell>
                    <TableCell align="right">Bs. {p.saldoNuevo}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
