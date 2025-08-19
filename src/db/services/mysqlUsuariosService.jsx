import AbstractUserService from "./userServiceInterface";

export default class MySQLUsuariosService extends AbstractUserService {
  constructor() {
    super();
    this.baseUrl = process.env.REACT_APP_API_URL || "http://localhost:3001";
  }

  // Traer todos los usuarios desde /usuarios (no /users)
  async fetchAll() {
    const res = await fetch(`${this.baseUrl}/usuarios`);
    return await res.json();
  }

  // Crear un usuario en /usuarios
  async create(user) {
    const res = await fetch(`${this.baseUrl}/usuarios`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    return await res.json();
  }

  // Eliminar usuario en /usuarios/:id
  async delete(userId) {
    await fetch(`${this.baseUrl}/usuarios/${userId}`, { method: "DELETE" });
    return { success: true };
  }

  // ⚠️ Aquí NO se maneja login
  async login() {
    throw new Error("Login no disponible en MySQLUsuariosService");
  }
}
