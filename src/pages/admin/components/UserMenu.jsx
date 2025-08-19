// src/components/UserMenu.jsx
import React, { useState } from "react";
import {
  Avatar,
  Box,
  //IconButton,
  Menu,
  MenuItem,
  Typography,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const UserMenu = ({ username = "Admin", avatar = "/usuario.jpg", onLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {/* Avatar clickeable */}
      {/*<IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>*/}
        <Avatar
          src={avatar}
          alt={username}
          sx={{ width: 40, height: 40, border: "2px solid #fff" }}
        />
      {/*</IconButton>*/}

      {/* Nombre */}
      <Typography
        variant="body2"
        sx={{
          ml: 1,
          cursor: "pointer",
          fontWeight: 600,
          "&:hover": { color: "primary.light" },
        }}
        onClick={handleOpenMenu}
      >
        {username}
      </Typography>

      {/* Menú con animación */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        PaperProps={{
          component: motion.div, // Framer Motion animación
          initial: { opacity: 0, scale: 0.95, y: -10 },
          animate: { opacity: 1, scale: 1, y: 0 },
          exit: { opacity: 0, scale: 0.95, y: -10 },
          transition: { duration: 0.2 },
          sx: {
            mt: 1,
            borderRadius: 3,
            boxShadow: "0px 8px 20px rgba(0,0,0,0.15)",
            minWidth: 200,
            overflow: "hidden",
          },
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Box sx={{ px: 2, py: 1.5, display: "flex", alignItems: "center" }}>
          <Avatar src={avatar} alt={username} sx={{ width: 40, height: 40, mr: 1 }} />
          <Typography variant="subtitle2" fontWeight={700}>
            {username}
          </Typography>
        </Box>

        <Divider />

        <MenuItem onClick={() => { handleCloseMenu(); alert("Ir a Perfil"); }}>
          <AccountCircleIcon fontSize="small" sx={{ mr: 1 }} />
          Perfil
        </MenuItem>

        <MenuItem onClick={() => { handleCloseMenu(); alert("Ir a Configuración"); }}>
          <SettingsIcon fontSize="small" sx={{ mr: 1 }} />
          Configuración
        </MenuItem>

        <Divider />

        <MenuItem
          onClick={() => {
            handleCloseMenu();
            if (onLogout) onLogout();
          }}
          sx={{ color: "error.main", fontWeight: 600 }}
        >
          <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
          Cerrar sesión
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;
