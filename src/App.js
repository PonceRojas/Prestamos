// src/App.js
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Landing from "./pages/web/Landing";
import AdminRoutes from "./pages/admin/routes/AdminRoutes";  // Importamos el archivo modular

const showLanding = process.env.REACT_APP_SHOW_LANDING === "true";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing solo si está habilitada por .env */}
        {showLanding && <Route path="/landing" element={<Landing />} />}

        {/* Ruta raíz: redirige según la config */}
        <Route
          path="/"
          element={showLanding ? <Navigate to="/landing" /> : <Login />}
        />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Rutas protegidas del admin (AdminRoutes maneja sus subrutas) */}
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* Redirección 404 */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
