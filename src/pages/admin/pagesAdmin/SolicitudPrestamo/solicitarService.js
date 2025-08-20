
import { db } from "../../../../db/firebase"; // tu configuración de Firebase
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
const collectionName = "solicitudesPrestamo";

const fetchAll = async () => {
  const snapshot = await getDocs(collection(db, collectionName));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const create = async (solicitud) => {
  const docRef = await addDoc(collection(db, collectionName), solicitud);
  return { id: docRef.id, ...solicitud };
};

const update = async (id, solicitud) => {
  await updateDoc(doc(db, collectionName, id), solicitud);
  return { id, ...solicitud };
};

export default { fetchAll, create, update };
