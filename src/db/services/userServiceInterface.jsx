export default class AbstractUserService {
  async fetchAll() {
    throw new Error('fetchAll() no implementado');
  }

  async create(user) {
    throw new Error('create() no implementado');
  }

  async delete(userId) {
    throw new Error('delete() no implementado');
  }

  // Puedes añadir más métodos según tus necesidades
}
