// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Corrected import

const api = process.env.API_KEY

const firebaseConfig = {
    apiKey: api,
    authDomain: "testingadmin-382b3.firebaseapp.com",
    databaseURL: "https://testingadmin-382b3-default-rtdb.firebaseio.com",
    projectId: "testingadmin-382b3",
    storageBucket: "testingadmin-382b3.appspot.com",
    messagingSenderId: "610195032520",
    appId: "1:610195032520:web:0dfd9249914c0abc0398fd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Corrected function call

export { db };
