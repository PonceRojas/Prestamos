import AbstractUserService from "./userServiceInterface";

export default class MySQLUserService extends AbstractUserService {
  constructor() {
    super();
    this.baseUrl = process.env.REACT_APP_API_URL || "http://localhost:4000"; // ojo: backend usa 4000
  }

  // Ahora usamos /api/usuarios en lugar de /users
  async fetchAll() {
    const res = await fetch(`${this.baseUrl}/api/usuarios`);
    return await res.json();
  }

  async create(user) {
    const res = await fetch(`${this.baseUrl}/api/usuarios`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    return await res.json();
  }

  async delete(userId) {
    await fetch(`${this.baseUrl}/api/usuarios/${userId}`, { method: "DELETE" });
    return { success: true };
  }

  // Login sigue igual porque usa la tabla users
  async login(username, password) {
    try {
      const res = await fetch(`${this.baseUrl}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) return null;
      return await res.json();
    } catch (err) {
      console.error("Error login MySQL:", err);
      return null;
    }
  }
}
