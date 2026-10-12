import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp, getDocs, query, orderBy } from "firebase/firestore";

// Configuración de Firebase del usuario
export const firebaseConfig = {
  apiKey: "AIzaSyCFMVXS4wp0a032aHXjnm8SD43uVeL297I",
  authDomain: "formbb-d0620.firebaseapp.com",
  projectId: "formbb-d0620",
  storageBucket: "formbb-d0620.firebasestorage.app",
  messagingSenderId: "1002833513562",
  appId: "1:1002833513562:web:bb3dd08b29ecdeb9fe5c63",
  measurementId: "G-RMGDWLF6CT"
};

// Inicialización segura para SSR / Next.js (Singleton)
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Inicialización de la Base de Datos Firestore
export const db = getFirestore(app);

export interface BirthdayRsvpPayload {
  nombre: string;
  alias: string;
  nivelAlcoholismo: number;
  comoTerminar: string;
  bebidas: string[];
  aceptoTerminos: boolean;
  referenceId: string;
}

/**
 * Función para guardar la confirmación de asistencia en la base de datos Firestore
 * Colección: "confirmaciones"
 */
export async function saveBirthdayRsvp(data: BirthdayRsvpPayload) {
  try {
    const docRef = await addDoc(collection(db, "confirmaciones"), {
      ...data,
      creadoEl: serverTimestamp(),
      fechaEnvio: new Date().toISOString(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error al guardar en Firebase Firestore:", error);
    throw error;
  }
}

/**
 * Función opcional para consultar todas las confirmaciones registradas
 */
export async function getBirthdayRsvps() {
  try {
    const q = query(collection(db, "confirmaciones"), orderBy("creadoEl", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error al obtener confirmaciones de Firebase:", error);
    throw error;
  }
}
