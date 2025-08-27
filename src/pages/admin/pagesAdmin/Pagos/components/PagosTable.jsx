// src/pages/admin/pagesAdmin/Pagos/components/PagosTable.jsx
import React from "react";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Tooltip, IconButton } from "@mui/material";
import { Visibility as VisibilityIcon, Add as AddIcon } from "@mui/icons-material";

export default function PagosTable({ rows, onView, onRegistrar, loading }) {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: "12px", overflow: "hidden" }}>
      <Table>
        <TableHead sx={{ backgroundColor: "primary.main" }}>
          <TableRow>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Cliente</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Carnet</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Monto préstamo</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Saldo</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Fecha préstamo</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Fecha límite (+30)</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Días a vencer</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Estado</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }} align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow><TableCell colSpan={8}>Cargando…</TableCell></TableRow>
          ) : rows.length === 0 ? (
            <TableRow><TableCell colSpan={8} sx={{ textAlign: "center", py: 3 }}>No hay registros para este filtro.</TableCell></TableRow>
          ) : (
            rows.map((r) => (
              <TableRow key={r.id} sx={{ "&:hover": { backgroundColor: "action.hover" } }}>
                <TableCell>{r.cliente}</TableCell>
                <TableCell>{r.carnet || "—"}</TableCell>
                <TableCell>Bs. {r.monto}</TableCell>
                <TableCell>Bs. {r.saldo}</TableCell>
                <TableCell>{r.fecha}</TableCell>
                <TableCell>{r.fechaLimite}</TableCell>
                <TableCell>{r.diasAVencer}</TableCell>
                <TableCell>{r.estado}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Ver detalles">
                    <IconButton color="info" onClick={() => onView(r)}>
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Registrar pago">
                    <IconButton color="primary" onClick={() => onRegistrar(r)}>
                      <AddIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
