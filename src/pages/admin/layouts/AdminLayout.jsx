import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const drawerWidth = 220;
const closedDrawerWidth = 60;

const AdminLayout = () => {
  const [open, setOpen] = useState(false);

  // Abrir sidebar al pasar el mouse
  const handleSidebarMouseEnter = () => setOpen(true);
  // Cerrar sidebar al quitar el mouse
  const handleSidebarMouseLeave = () => setOpen(false);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        background: "#f4f6f8",
        overflow: "hidden",
      }}
    >
      <CssBaseline />
      {/* Navbar fijo y responsivo */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1201,
        }}
      >
        <Navbar
          sidebarOpen={open}
          drawerWidth={drawerWidth}
          closedDrawerWidth={closedDrawerWidth}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: 1,
          pt: { xs: 0, sm: 0.5 }, //Apartado para la distancia entre el navbar y el card de productos o cualquier otro apartado del admin
          width: "100%",
          overflow: "hidden",
        }}
      >
        {/* Sidebar con eventos de mouse */}
        <Box
          onMouseEnter={handleSidebarMouseEnter}
          onMouseLeave={handleSidebarMouseLeave}
          sx={{
            height: "100vh",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 1200,
            width: open ? drawerWidth : closedDrawerWidth,
            transition: "width 0.3s",
            overflow: "hidden",
            bgcolor: "background.paper",
          }}
        >
          <Sidebar open={open} handleDrawerToggle={() => {}} />
        </Box>
        {/* Contenido principal responsivo */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 1, sm: 3 },
            ml: open ? `${drawerWidth}px` : `${closedDrawerWidth}px`,
            width: {
              xs: `calc(100% - ${open ? drawerWidth : closedDrawerWidth}px)`,
              sm: `calc(100% - ${open ? drawerWidth : closedDrawerWidth}px)`,
            },
            minHeight: "calc(100vh - 64px)",
            overflowY: "auto",
            overflowX: "hidden",
            transition: "margin-left 0.3s",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
      {/* Footer responsivo y siempre visible */}

      
     <Box
        sx={{
          width: "100%",
          ml: 0, // Sin margen izquierdo
          zIndex:1300, // Asegura que el footer esté por encima del contenido
        }}
      >
        <Footer />
      </Box>
    </Box>
  );
};

export default AdminLayout;