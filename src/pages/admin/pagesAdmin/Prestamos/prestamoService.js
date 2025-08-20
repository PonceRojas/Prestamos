// 🔹 Backend desacoplado para préstamos
import { db } from "../../../../db/firebase"; // tu configuración de Firebase
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";

const prestamosCollection = "prestamos";
const solicitudesCollection = "solicitudesPrestamo";

const fetchAll = async () => {
  const snapshot = await getDocs(collection(db, prestamosCollection));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const create = async (prestamo) => {
  const docRef = await addDoc(collection(db, prestamosCollection), prestamo);
  return { id: docRef.id, ...prestamo };
};

const update = async (id, prestamo) => {
  await updateDoc(doc(db, prestamosCollection, id), prestamo);
  return { id, ...prestamo };
};

const remove = async (id) => {
  await deleteDoc(doc(db, prestamosCollection, id));
  return id;
};

// 🔹 Función para aceptar solicitud y generar préstamo
const aceptarSolicitud = async (solicitud) => {
  // 1️⃣ Crear préstamo en colección prestamos
  const nuevoPrestamo = {
    cliente: solicitud.cliente || "Desconocido",
    monto: solicitud.monto,
    plazo: solicitud.plazo,
    motivo: solicitud.motivo,
    fecha: new Date().toISOString().split("T")[0],
    estado: "Activo"
  };
  const prestamoCreado = await create(nuevoPrestamo);

  // 2️⃣ Actualizar estado de solicitud
  await updateDoc(doc(db, solicitudesCollection, solicitud.id), { estado: "Aprobado" });

  return prestamoCreado;
};

export default { fetchAll, create, update, delete: remove, aceptarSolicitud };