import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Box,
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Payment } from "@mui/icons-material";

const drawerWidth = 220;
const closedDrawerWidth = 60;

const menuItems = [
  { path: "/admin", label: "Inicio", icon: <DashboardIcon /> },
  { path: "/admin/usuarios", label: "Usuarios", icon: <PeopleIcon /> },
  { path: "/admin/Pedirprestamo", label: "Crear Prestamos", icon: <ShoppingCartIcon /> }, //Aqui agregas la vista de el a partado de Sidebar
  /* { path: "/admin/solicitar-prestamo", label: "Solicitar Préstamo", icon: <ShoppingCartIcon /> }, */
  { path: "/admin/pagos", label: "Pagos", icon: <Payment /> },
];

const Sidebar = ({ open, handleDrawerToggle }) => {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? drawerWidth : closedDrawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
        boxSizing: "border-box",
        transition: (theme) =>
          theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        "& .MuiDrawer-paper": {
          width: open ? drawerWidth : closedDrawerWidth,
          boxSizing: "border-box",
          background: "#23234f",
          color: "#fff",
          overflowX: "hidden",
          transition: (theme) =>
            theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
        },
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: open ? "flex-end" : "center",
          px: [1],
        }}
      >
        <IconButton onClick={handleDrawerToggle} sx={{ color: "#fff" }}>
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </Toolbar>
      <Box sx={{ overflowY: "auto", overflowX: "hidden" }}>
        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.path}
              component={Link}  // Link ya hace la función de botón
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                mb: 1,
                borderRadius: 2,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                "&.Mui-selected": {
                  background: "linear-gradient(90deg, #1e3c72 60%, #2a5298 100%)",
                  color: "#fff",
                  boxShadow: 2,
                },
                color: "#fff",
                transition: "background 0.3s",
                minWidth: 0,
                maxWidth: "100%",
                overflow: "hidden",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  color: "#fff",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} sx={{ opacity: open ? 1 : 0 }} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
