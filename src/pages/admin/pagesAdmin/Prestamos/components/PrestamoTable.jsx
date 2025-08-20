import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Visibility as VisibilityIcon, Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

const PrestamoTable = ({ prestamos, onView, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper} sx={{ boxShadow: 6, borderRadius: "8px" }}>
      <Table>
        <TableHead sx={{ backgroundColor: "primary.light" }}>
          <TableRow>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Cliente</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Carnet</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Celular</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Contacto Familiar</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Monto</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Fecha</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Estado</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Detalles</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Foto</TableCell>
            <TableCell align="right" sx={{ color: "white", fontWeight: "bold" }}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {prestamos.length === 0 ? (
            <TableRow>
              <TableCell colSpan={10} sx={{ textAlign: "center", py: 3 }}>
                No hay préstamos registrados.
              </TableCell>
            </TableRow>
          ) : (
            prestamos.map((p) => (
              <TableRow
                key={p.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { backgroundColor: "action.hover" },
                }}
              >
                <TableCell>{p.cliente}</TableCell>
                <TableCell>{p.carnet}</TableCell>
                <TableCell>{p.celular}</TableCell>
                <TableCell>{p.contactoFamiliar}</TableCell>
                <TableCell>{p.monto}</TableCell>
                <TableCell>{p.fecha}</TableCell>
                <TableCell>{p.estado}</TableCell>
                <TableCell>{p.detalles}</TableCell>
                <TableCell>
                  {p.foto && <img src={p.foto} alt="Cliente" style={{ width: 50, height: 50, objectFit: "cover" }} />}
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Ver Detalles">
                    <IconButton color="info" onClick={() => onView(p)}>
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Editar">
                    <IconButton color="primary" onClick={() => onEdit(p)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <IconButton color="error" onClick={() => onDelete(p.id)}>
                      <DeleteIcon />
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
};

export default PrestamoTable;
