import React, { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  IconButton,
  Tooltip,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Add as AddIcon,
  Search as SearchIcon,
} from "@mui/icons-material";

import userService from "../../../db/services/userService"; 
// 🔗 backend desacoplado: puede ser Firebase o MySQL

const Usuarios = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);

  // 🔹 Cargar usuarios desde el servicio (Firebase/MySQL)
  useEffect(() => {
    userService
      .fetchAll()
      .then(setUsers)
      .catch((err) => console.error("Error cargando usuarios:", err));
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // 🔹 Filtrado seguro
  const filteredUsers = users.filter((user) => {
    const name = user?.name ?? "";
    const email = user?.email ?? "";
    const role = user?.role ?? "";
    return (
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // 🔹 Acciones CRUD (se conectan al servicio)
  const handleView = (user) => {
    alert(`Ver detalles de: ${user.name} (ID: ${user.id})`);
  };

  const handleEdit = (user) => {
    alert(`Editar usuario: ${user.name} (ID: ${user.id})`);
  };

  const handleDelete = async (userId) => {
    if (window.confirm(`¿Eliminar al usuario con ID: ${userId}?`)) {
      await userService.delete(userId);
      setUsers(users.filter((user) => user.id !== userId));
    }
  };

  const handleAddUser = async () => {
    const name = prompt("Nombre completo");
    const email = prompt("Email");
    const role = prompt("Rol (Administrador, Editor, Usuario)");
    const status = prompt("Estado (Activo, Inactivo)");
    const avatar = prompt("URL del avatar (opcional)");

    if (!name || !email) {
      return alert("Nombre y email son obligatorios");
    }

    const newUser = { name, email, role, status, avatar };
    const savedUser = await userService.create(newUser);
    setUsers([...users, savedUser]);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        m: 2,
        mt: { xs: 2, sm: 2 },
        borderRadius: "12px",
      }}
    >
      {/* 🔹 Header con búsqueda y botón añadir */}
      <Grid container spacing={3} alignItems="center" mb={3}>
        <Grid item xs={12} md={6}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ fontWeight: "bold", color: "primary.main" }}
          >
            Gestión de Usuarios
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Administra los usuarios de tu plataforma de manera eficiente.
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            justifyContent: { xs: "flex-start", md: "flex-end" },
            gap: 2,
          }}
        >
          <TextField
            label="Buscar usuario"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ flexGrow: 1, maxWidth: 300 }}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddUser}
            sx={{ whiteSpace: "nowrap" }}
          >
            Añadir Usuario
          </Button>
        </Grid>
      </Grid>

      {/* 🔹 Tabla de usuarios */}
      <TableContainer component={Paper} sx={{ boxShadow: 6, borderRadius: "8px" }}>
        <Table sx={{ minWidth: 650 }} aria-label="tabla de usuarios">
          <TableHead sx={{ backgroundColor: "primary.light" }}>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Avatar</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Nombre</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Rol</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Estado</TableCell>
              <TableCell align="right" sx={{ color: "white", fontWeight: "bold" }}>
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} sx={{ textAlign: "center", py: 3 }}>
                  <Typography variant="subtitle1" color="text.secondary">
                    No se encontraron usuarios.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": { backgroundColor: "action.hover" },
                  }}
                >
                  <TableCell>
                    <Avatar alt={user.name} src={user.avatar} />
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.status}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Ver Detalles">
                      <IconButton color="info" onClick={() => handleView(user)}>
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Editar Usuario">
                      <IconButton color="primary" onClick={() => handleEdit(user)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar Usuario">
                      <IconButton color="error" onClick={() => handleDelete(user.id)}>
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
    </Paper>
  );
};

export default Usuarios;
