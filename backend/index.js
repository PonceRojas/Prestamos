import express from "express";
import cors from "cors";

// Importar rutas
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import usuariosRoutes from "./routes/usuarios.js";

const app = express();

// Middlewares
app.use(cors({
  origin: "http://localhost:3000", // Frontend React
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: ["Content-Type"]
}));
app.use(express.json());

// Rutas
app.use("/users", userRoutes);           // CRUD para tabla users
app.use("/api/users", authRoutes);       // Login
app.use("/api/usuarios", usuariosRoutes); // CRUD para tabla usuarios

// Iniciar servidor
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
