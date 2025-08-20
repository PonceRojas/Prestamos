// src/db/services/firebaseUsuariosService.js
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db, auth } from "../firebase"; // Ojo: importa auth aquí
import { signInWithEmailAndPassword } from "firebase/auth";
import AbstractUserService from "./userServiceInterface"; 

const usersCollection = collection(db, "users");

export default class FirebaseUserService extends AbstractUserService {
  // --- Usuarios ---
  async fetchAll() {
    const snapshot = await getDocs(usersCollection);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  async create(user) {
    const docRef = await addDoc(usersCollection, user);
    return { id: docRef.id, ...user };
  }

  async delete(userId) {
    await deleteDoc(doc(db, "users", userId));
    return { success: true };
  }

  // --- Login (Firebase Auth) ---
  async login(username, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        username,
        password
      );
      return userCredential.user;
    } catch (err) {
      console.error("Error login Firebase:", err);
      return null;
    }
  }
}
