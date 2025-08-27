// src/pages/admin/pagesAdmin/Pagos/pagoService.js
import { db } from "../../../../db/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  runTransaction,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

const COLL_PAGOS = "pagos";
const COLL_PRESTAMOS = "prestamos";
const COLL_HISTORIAL = "historialPrestamos";

const monthsDiff = (fromISO, toISO) => {
  const from = fromISO ? new Date(fromISO) : new Date();
  const to = toISO ? new Date(toISO) : new Date();
  const y = to.getFullYear() - from.getFullYear();
  const m = to.getMonth() - from.getMonth();
  let months = y * 12 + m;
  if (to.getDate() < from.getDate()) months -= 1;
  return Math.max(0, months);
};

async function capitalizarSiCorresponde(tx, prestamoRef) {
  const snap = await tx.get(prestamoRef);
  if (!snap.exists()) throw new Error("Préstamo no encontrado");
  const p = snap.data();

  const interes = Number(p.interes) || 0;
  if (interes <= 0) return p;

  const ultima = p.ultimaCapitalizacion || p.fecha || new Date().toISOString();
  const ahora = new Date().toISOString();
  const nMeses = monthsDiff(ultima, ahora);
  if (nMeses <= 0) return p; // ⬅️ NADA si no hay meses completos

  const saldoActual = typeof p.saldo === "number" ? Number(p.saldo) : Number(p.monto) || 0;
  const factor = Math.pow(1 + interes / 100, nMeses);
  const saldoNuevo = Number((saldoActual * factor).toFixed(2));

  tx.update(prestamoRef, {
    saldo: saldoNuevo,
    ultimaCapitalizacion: ahora,
    actualizadoEn: serverTimestamp(),
  });

  return { ...p, saldo: saldoNuevo, ultimaCapitalizacion: ahora };
}

export async function fetchPrestamosActivos() {
  const snap = await getDocs(collection(db, COLL_PRESTAMOS));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function fetchPagosPorPrestamo(prestamoId) {
  const qy = query(
    collection(db, COLL_PAGOS),
    where("prestamoId", "==", prestamoId),
    orderBy("creadoEn", "desc")
  );
  const snap = await getDocs(qy);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function registrarPago({ prestamoId, cliente, monto, fecha, metodo, referencia, notas }) {
  if (!prestamoId) throw new Error("prestamoId es requerido");
  const pago = Number(monto);
  if (!pago || pago <= 0) throw new Error("Monto de pago inválido");

  const prestamoRef = doc(db, COLL_PRESTAMOS, prestamoId);
  const pagosCol = collection(db, COLL_PAGOS);

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
      // nota: ultimaCapitalizacion ya fue movida en capitalizarSiCorresponde si correspondía
    });

    // 5) Archivar si quedó saldado
    if (saldoNuevo <= 0) {
      await addDoc(collection(db, COLL_HISTORIAL), {
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
        // si no se capitalizó en esta operación, conservar la marca original
        ultimaCapitalizacion: pCap.ultimaCapitalizacion || pCap.fecha,
      },
    };
  });

  return result;
}
