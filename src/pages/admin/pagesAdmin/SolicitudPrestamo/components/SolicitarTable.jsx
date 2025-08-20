import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

const SolicitarTable = ({ solicitudes, onAccept, onReject }) => {
  return (
    <TableContainer component={Paper} sx={{ boxShadow: 6, borderRadius: "8px" }}>
      <Table>
        <TableHead sx={{ backgroundColor: "primary.light" }}>
          <TableRow>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Monto</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Plazo</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Motivo</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Estado</TableCell>
            <TableCell align="right" sx={{ color: "white", fontWeight: "bold" }}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {solicitudes.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} sx={{ textAlign: "center", py: 3 }}>
                No hay solicitudes pendientes.
              </TableCell>
            </TableRow>
          ) : (
            solicitudes.map((s) => (
              <TableRow key={s.id}>
                <TableCell>{s.monto}</TableCell>
                <TableCell>{s.plazo}</TableCell>
                <TableCell>{s.motivo}</TableCell>
                <TableCell>{s.estado || "Pendiente"}</TableCell>
                
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SolicitarTable;
