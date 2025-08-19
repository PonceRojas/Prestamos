// src/components/Navbar.jsx
import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Avatar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import UserMenu from "./UserMenu";  //Instalar npm install framer-motion

const Navbar = ({ onMenuClick }) => {
  const handleLogout = () => {
    console.log("🔒 Sesión cerrada");
    // Aquí puedes limpiar token, llamar backend /logout, redirigir, etc.
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        background: "linear-gradient(90deg, #1e3c72 60%, #2a5298 100%)",
        boxShadow: 3,
      }}
    >
      <Toolbar
        sx={{
          minHeight: { xs: 56, sm: 64 },
          px: { xs: 1, sm: 3 },
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Botón de menú lateral */}
        <IconButton
          edge="start"
          color="inherit"
          onClick={onMenuClick}
          sx={{ mr: 2, display: { xs: "block", sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Logo */}
        <Avatar src="/imagen1.jpg" alt="Logo" sx={{ mr: 2 }} />

        {/* Título */}
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: 700,
            letterSpacing: 2,
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          Panel Admin
        </Typography>

        {/* Menú usuario */}
        <UserMenu username="Administrador" avatar="/usuario.jpg" onLogout={handleLogout} />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
