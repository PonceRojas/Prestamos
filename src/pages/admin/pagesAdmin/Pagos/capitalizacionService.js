import { db } from "../../../../db/firebase";
import { updateDoc, serverTimestamp, doc } from "firebase/firestore";

// Calcular los meses completos entre dos fechas
const monthsDiff = (fromISO, toISO) => {
  const from = new Date(fromISO);
  const to = new Date(toISO);
  let months = (to.getFullYear() - from.getFullYear()) * 12;
  months += to.getMonth() - from.getMonth();
  if (to.getDate() < from.getDate()) months -= 1; // Si no pasó un mes completo
  return Math.max(0, months);
};

export async function capitalizarSiCorresponde(tx, prestamoRef) {
  const snap = await tx.get(prestamoRef);
  if (!snap.exists()) throw new Error("Préstamo no encontrado");
  const p = snap.data();

  const interes = Number(p.interes) || 0;
  if (interes <= 0) return p; // No aplica si no hay interés

  const ultima = p.ultimaCapitalizacion || p.fecha || new Date().toISOString();
  const ahora = new Date().toISOString();
  const nMeses = monthsDiff(ultima, ahora); // Calcula la diferencia de meses completos

  // Si no han pasado meses completos, no capitalizar
  if (nMeses <= 0) return p;

  // Verifica si han pasado más de 30 días desde la última capitalización
  const saldoActual = typeof p.saldo === "number" ? Number(p.saldo) : Number(p.monto) || 0;
  
  // Aplicar el interés después de 30 días
  const factor = Math.pow(1 + interes / 100, nMeses);  // Interés compuesto
  const saldoNuevo = Number((saldoActual * factor).toFixed(2));

  // Actualizar el préstamo con el nuevo saldo
  tx.update(prestamoRef, {
    saldo: saldoNuevo,
    ultimaCapitalizacion: ahora,  // Actualizamos la fecha de capitalización
    actualizadoEn: serverTimestamp(),
  });

  return { ...p, saldo: saldoNuevo, ultimaCapitalizacion: ahora };
}