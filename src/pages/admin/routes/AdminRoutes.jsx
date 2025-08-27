//En este Apartado seleccionas la Ruta de tu panel de administración
//y las rutas de las diferentes páginas que componen el panel de administración
import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pagesAdmin/Home/Dashboard";
import Usuarios from "../pagesAdmin/Usuarios/Usuarios";

import Prestamo from "../pagesAdmin/Prestamos/GenerarPrestamo"; // Assuming 'Ventas' is the correct import for ventas
import SolicitarPrestamo from "../pagesAdmin/SolicitudPrestamo/SolicitarPrestamo"; // Assuming 'SolicitarPrestamo' is the correct import for solicitar prestamos
import RealizarPago from "../pagesAdmin/Pagos/RealizarPago";

const AdminRoutes = () => (
  <Routes>
    <Route path="/" element={<AdminLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="usuarios" element={<Usuarios />} />
      <Route path="Pedirprestamo" element={<Prestamo />} /> {/* Assuming 'Compras' is similar to 'Ventas' */} 
      <Route path="SolicitarPrestamo" element={<SolicitarPrestamo />} />
      <Route path="Pagos" element={<RealizarPago />} />
    </Route>
  </Routes>
);

export default AdminRoutes;
//instalar npm install react-router-dom 
//instalar npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
//instalar npm install @mui/icons-material
//Todo esto para el funcionamiento del panel de administración
//Asegúrate de que las rutas de las páginas coincidan con las que has creado  
