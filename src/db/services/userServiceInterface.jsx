// src/db/services/userServiceInterface.js
export default class AbstractUserService {
  // --- Métodos de usuarios ---
  async fetchAll() {
    throw new Error("fetchAll() no implementado");
  }

  async create(user) {
    throw new Error("create() no implementado");
  }

  async delete(userId) {
    throw new Error("delete() no implementado");
  }

  // --- Métodos de préstamos ---
  async fetchLoans() {
    throw new Error("fetchLoans() no implementado");
  }

  async createLoan(loan) {
    throw new Error("createLoan() no implementado");
  }

  async deleteLoan(loanId) {
    throw new Error("deleteLoan() no implementado");
  }

  async approveLoan(loanId) {
    throw new Error("approveLoan() no implementado");
  }

  async rejectLoan(loanId) {
    throw new Error("rejectLoan() no implementado");
  }
}
