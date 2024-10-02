// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClx_kwNN5GaRbJ-p559bk-IqpI2wFZoqA",
  authDomain: "recursos-dashboard.firebaseapp.com",
  projectId: "recursos-dashboard",
  storageBucket: "recursos-dashboard.appspot.com",
  messagingSenderId: "422204463772",
  appId: "1:422204463772:web:2fd053094742e211ae2b59",
  measurementId: "G-QJRKSZH3X3"
};

// Initialize Firebase
// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar Firestore
export const db = getFirestore(app);