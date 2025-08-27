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
import {
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

const PrestamoTable = ({ prestamos, onView, onEdit, onDelete }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: 6,
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <Table>
        {/* ENCABEZADO */}
        <TableHead sx={{ backgroundColor: "primary.main" }}>
          <TableRow>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Cliente
            </TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Carnet
            </TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Interés (%/mes)
            </TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Monto
            </TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Fecha
            </TableCell>
            <TableCell
              align="right"
              sx={{ color: "white", fontWeight: "bold" }}
            >
              Acciones
            </TableCell>
          </TableRow>
        </TableHead>

        {/* CUERPO */}
        <TableBody>
          {prestamos.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} sx={{ textAlign: "center", py: 3 }}>
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
                 <TableCell>{p.interes ?? 0}</TableCell>
                <TableCell>{p.monto}</TableCell>
                <TableCell>{p.fecha}</TableCell>
                <TableCell align="right">
                  {/* Botón Ver Detalles */}
                  <Tooltip title="Ver Detalles">
                    <IconButton color="info" onClick={() => onView(p)}>
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>

                  {/* Botón Editar */}
                  <Tooltip title="Editar">
                    <IconButton color="primary" onClick={() => onEdit(p)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>

                  {/* Botón Eliminar */}
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
