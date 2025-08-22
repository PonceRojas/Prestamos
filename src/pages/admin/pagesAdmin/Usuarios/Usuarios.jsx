// src/pages/admin/pagesAdmin/Usuarios/Usuarios.jsx
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

import userService from "../../../../db/services/userService"; 
import UsuarioForm from "./UsuariosForm"; // Formulario dentro del modal

const Usuarios = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Cargar usuarios
  useEffect(() => {
    userService
      .fetchAll()
      .then(setUsers)
      .catch((err) => console.error("Error cargando usuarios:", err));
  }, []);

  const handleSearchChange = (event) => setSearchTerm(event.target.value);

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

  // Abrir modal para añadir usuario
  const handleAddUser = () => {
    setSelectedUser(null);
    setModalOpen(true);
  };

  // Abrir modal para editar usuario
  const handleEdit = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  // Guardar usuario (crear o actualizar)
  const handleSaveUser = async (userData) => {
    if (selectedUser) {
      // Actualizar usuario
      const updatedUser = await userService.update(selectedUser.id, userData);
      setUsers(users.map((u) => (u.id === selectedUser.id ? updatedUser : u)));
    } else {
      // Crear usuario
      const newUser = await userService.create(userData);
      setUsers([...users, newUser]);
    }
    setModalOpen(false);
  };

  const handleDelete = async (userId) => {
    if (window.confirm(`¿Eliminar al usuario con ID: ${userId}?`)) {
      await userService.delete(userId);
      setUsers(users.filter((u) => u.id !== userId));
    }
  };

  const handleView = (user) => {
    alert(`Ver detalles de: ${user.name} (ID: ${user.id})`);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, m: 2, mt: 2, borderRadius: "12px" }}>
      {/* Header con búsqueda y botón añadir */}
      <Grid container spacing={3} alignItems="center" mb={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "primary.main" }}>
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
          sx={{ display: "flex", justifyContent: { xs: "flex-start", md: "flex-end" }, gap: 2 }}
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

      {/* Tabla de usuarios */}
      <TableContainer component={Paper} sx={{ boxShadow: 6, borderRadius: "8px" }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ backgroundColor: "primary.light" }}>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Avatar</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Nombre</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Rol</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Estado</TableCell>
              <TableCell align="right" sx={{ color: "white", fontWeight: "bold" }}>Acciones</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} sx={{ textAlign: "center", py: 3 }}>
                  No se encontraron usuarios.
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id} sx={{ "&:hover": { backgroundColor: "action.hover" } }}>
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

      {/* Modal para crear/editar usuario */}
      <UsuarioForm
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveUser}
        usuario={selectedUser}
      />
    </Paper>
  );
};

export default Usuarios;
