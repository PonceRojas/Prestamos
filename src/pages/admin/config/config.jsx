module.exports = {
  DB_TYPE: 'firebase' // cambia a 'mysql' si usas MySQL
};

// /server/db/firebase.js
const admin = require('firebase-admin');
const { v4: uuid } = require('uuid');

admin.initializeApp({
  credential: admin.credential.cert(require('../firebase-credentials.json')),
});

const db = admin.firestore();
const usersRef = db.collection('users');

module.exports = {
  async getUsers() {
    const snapshot = await usersRef.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async createUser(data) {
    const id = uuid();
    await usersRef.doc(id).set(data);
    return { id, ...data };
  },

  async deleteUser(id) {
    await usersRef.doc(id).delete();
  },
};