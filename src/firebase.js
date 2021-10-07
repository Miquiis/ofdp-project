import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDuTHi-ZxRDFZa14P4zsyV-cBT1_jWTdEU",
    authDomain: "ofdp-dev.firebaseapp.com",
    projectId: "ofdp-dev",
    storageBucket: "ofdp-dev.appspot.com",
    messagingSenderId: "945218818208",
    appId: "1:945218818208:web:8749b5f1a2bd515424f9c5",
    measurementId: "G-NXW6LG0T5G"
  };

const app = firebase.initializeApp(firebaseConfig)

export const auth = app.auth();
export const firestore = app.firestore();
export default app;