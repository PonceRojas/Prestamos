// src/pages/admin/pagesAdmin/Prestamos/prestamoService.js
import { db } from "../../../../db/firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";

const prestamosCollection = "prestamos";
const solicitudesCollection = "solicitudesPrestamo";

// Función para normalizar los datos de entrada del préstamo
const todayISO = () => new Date().toISOString();
const todayYMD = () => todayISO().split("T")[0];

function normalizeInput(prestamo) {
  const monto = Number(prestamo.monto) || 0;
  const interes = Number(prestamo.interes ?? 0); // % mensual
  return {
    cliente: prestamo.cliente ?? "Desconocido",
    carnet: prestamo.carnet ?? "",
    celular: prestamo.celular ?? "",
    contactoFamiliar: prestamo.contactoFamiliar ?? "",
    detalles: prestamo.detalles ?? "",
    fotos: Array.isArray(prestamo.fotos) ? prestamo.fotos : [],
    monto,
    interes,
    estado: prestamo.estado ?? "Activo",
    fecha: prestamo.fecha || todayYMD(),
  };
}

// Crear un nuevo préstamo (incluye cálculo de saldo + 1 mes de interés si hay)
export const create = async (prestamo) => {
  const base = normalizeInput(prestamo);

  // Si el interés es mayor a 0, aplica 1 mes de interés
  const saldo =
    base.interes > 0
      ? Number((base.monto * (1 + base.interes / 100)).toFixed(2)) // saldo con 1 mes de interés
      : base.monto;

  const payload = {
    ...base,
    saldo,
    interesInicialAplicado: base.interes > 0 ? true : false,
    ultimaCapitalizacion: todayISO(),
    creadoEn: serverTimestamp(),
    actualizadoEn: serverTimestamp(),
    pagos: [],  // Inicializamos el array de pagos vacío
  };

  const ref = await addDoc(collection(db, prestamosCollection), payload);
  return { id: ref.id, ...payload };
};

// Obtener todos los préstamos
export const fetchAll = async () => {
  const snap = await getDocs(collection(db, prestamosCollection));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

// Obtener un préstamo por su ID
export const fetchById = async (id) => {
  const ref = doc(db, prestamosCollection, id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
};

// Actualizar un préstamo existente
export const update = async (id, prestamo) => {
  const current = await fetchById(id);
  if (!current) throw new Error("Préstamo no encontrado");
  const merged = normalizeInput({ ...current, ...prestamo });
  await updateDoc(doc(db, prestamosCollection, id), merged);
  return { id, ...merged };
};

// Eliminar un préstamo
export const remove = async (id) => {
  await deleteDoc(doc(db, prestamosCollection, id));
  return id;
};

// Aceptar una solicitud de préstamo y crear el préstamo
export const aceptarSolicitud = async (solicitud) => {
  const nowISO = todayISO();

  const monto = Number(solicitud.monto) || 0;
  const interes = Number(solicitud.interes ?? 0);

  const base = {
    cliente: solicitud.cliente || "Desconocido",
    carnet: solicitud.carnet || "",
    celular: solicitud.celular || "",
    contactoFamiliar: solicitud.contactoFamiliar || "",
    detalles: solicitud.detalles || solicitud.motivo || "",
    fotos: Array.isArray(solicitud.fotos) ? solicitud.fotos : [],
    monto,
    interes,
    estado: "Activo",
    fecha: todayYMD(),
  };

  // Si el interés es mayor a 0, aplica 1 mes de interés
  const saldo =
    interes > 0 ? Number((monto * (1 + interes / 100)).toFixed(2)) : monto;

  const payload = {
    ...base,
    saldo,
    interesInicialAplicado: interes > 0 ? true : false,
    ultimaCapitalizacion: nowISO,
    creadoEn: serverTimestamp(),
    actualizadoEn: serverTimestamp(),
    pagos: [],  // Inicializamos el array de pagos vacío
  };

  const ref = await addDoc(collection(db, prestamosCollection), payload);

  await updateDoc(doc(db, solicitudesCollection, solicitud.id), {
    estado: "Aprobado",
    aprobadoEn: serverTimestamp(),
    prestamoId: ref.id,
  });

  return { id: ref.id, ...payload };
};

export default { fetchAll, fetchById, create, update, delete: remove, aceptarSolicitud };
