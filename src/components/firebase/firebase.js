import { initializeApp } from "firebase/app";
// import { } from 'firebase/firestore';
// import { } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyBZc1eroxJ56qDb-dSygL035KZ_60T2XAw",
  authDomain: "todo-f969f.firebaseapp.com",
  projectId: "todo-f969f",
  storageBucket: "todo-f969f.appspot.com",
  messagingSenderId: "932839009815",
  appId: "1:932839009815:web:66cfa53396241e847db652",
  measurementId: "G-HVY97E7MEG"
};

export const app = initializeApp(firebaseConfig);