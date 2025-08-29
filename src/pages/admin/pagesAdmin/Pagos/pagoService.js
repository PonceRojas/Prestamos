// src/pages/admin/pagesAdmin/Pagos/pagoService.js
import { db } from "../../../../db/firebase"; // Asegúrate de importar correctamente la instancia de db
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  addDoc,
  doc,
  updateDoc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";  // Aquí importas las funciones necesarias

import { capitalizarSiCorresponde } from "./capitalizacionService"; // Ajusta la ruta si es necesario
// Función para obtener los préstamos activos
export async function fetchPrestamosActivos() {
  const snapshot = await getDocs(collection(db, "prestamos"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// Función para obtener los pagos de un préstamo específico
export async function fetchPagosPorPrestamo(prestamoId) {
  const q = query(
    collection(db, "pagos"),
    where("prestamoId", "==", prestamoId),
    orderBy("creadoEn", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// Función para registrar un pago
export async function registrarPago({
  prestamoId,
  cliente,
  monto,
  fecha,
  metodo,
  referencia,
  notas,
}) {
  if (!prestamoId) throw new Error("prestamoId es requerido");
  const pago = Number(monto);
  if (!pago || pago <= 0) throw new Error("Monto de pago inválido");

  const prestamoRef = doc(db, "prestamos", prestamoId);
  const pagosCol = collection(db, "pagos");

  const result = await runTransaction(db, async (tx) => {
    // 1) Capitalizar SOLO si pasaron meses completos
    const pCap = await capitalizarSiCorresponde(tx, prestamoRef);

    // 2) Saldo para descontar
    const saldoActual = typeof pCap.saldo === "number" ? Number(pCap.saldo) : Number(pCap.monto) || 0;
    if (pago > saldoActual) {
      throw new Error(`El pago (Bs. ${pago}) excede el saldo actual (Bs. ${saldoActual}).`);
    }

    // 3) Guardar pago (historial)
    const pagoDoc = {
      prestamoId,
      cliente: cliente || pCap.cliente || "Desconocido",
      monto: pago,
      fecha, // "YYYY-MM-DD"
      metodo: metodo || "Efectivo",
      referencia: referencia || "",
      notas: notas || "",
      saldoAnterior: saldoActual,
      saldoNuevo: Number((saldoActual - pago).toFixed(2)),
      creadoEn: serverTimestamp(),
    };
    await addDoc(pagosCol, pagoDoc);

    // 4) Actualizar préstamo (saldo / estado) — NO capitalizamos aquí
    const saldoNuevo = pagoDoc.saldoNuevo;
    const nuevoEstado = saldoNuevo <= 0 ? "Pagado" : (pCap.estado || "Activo");

    tx.update(prestamoRef, {
      saldo: saldoNuevo,
      estado: nuevoEstado,
      actualizadoEn: serverTimestamp(),
    });

    // 5) Archivar si quedó saldado
    if (saldoNuevo <= 0) {
      await addDoc(collection(db, "historialPrestamos"), {
        ...pCap, // snapshot del préstamo antes del último descuento
        idPrestamo: prestamoId,
        saldoFinal: 0,
        estadoFinal: "Pagado",
        archivadoEn: serverTimestamp(),
      });
    }

    // ⬅️ Devolver ultimaCapitalizacion para sincronizar la UI
    return {
      pago: pagoDoc,
      prestamoActualizado: {
        ...pCap,
        saldo: saldoNuevo,
        estado: nuevoEstado,
        ultimaCapitalizacion: pCap.ultimaCapitalizacion || pCap.fecha,
      },
    };
  });

  return result;
}
