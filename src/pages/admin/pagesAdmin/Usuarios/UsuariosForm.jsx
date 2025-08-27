// src/pages/admin/pagesAdmin/Usuarios/UsuarioForm.jsx
import React, { useState, useEffect } from "react";
import ModalReutilizable from "../../../../shared/componentes/modal/modal";
import { TextField, Grid } from "@mui/material";

import ActionButtons from "../../../../shared/buttoms/ActionButtons";


const UsuarioForm = ({ open, onClose, onSave, usuario }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    status: "",
    avatar: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (usuario) setForm(usuario);
    else setForm({ name: "", email: "", role: "", status: "", avatar: "" });
    setErrors({});
  }, [usuario, open]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!form.name) newErrors.name = "El nombre es obligatorio";
    if (!form.email) newErrors.email = "El email es obligatorio";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(form);
      setErrors({});
    }
  };

  return (
    <ModalReutilizable
      open={open}
      onClose={onClose}
      title={usuario ? "Editar Usuario" : "Nuevo Usuario"}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Nombre"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            error={!!errors.name}
            helperText={errors.name}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            error={!!errors.email}
            helperText={errors.email}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Rol"
            name="role"
            value={form.role}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Estado"
            name="status"
            value={form.status}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Avatar URL"
            name="avatar"
            value={form.avatar}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
      </Grid>

      <ActionButtons onClose={onClose} onSave={handleSave} />
    </ModalReutilizable>
  );
};

export default UsuarioForm;
