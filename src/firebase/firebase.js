// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLWvDLsP2nl9bA2e9Xs1SisvrF5yPFj7k",
  authDomain: "polling-app-x.firebaseapp.com",
  projectId: "polling-app-x",
  storageBucket: "polling-app-x.appspot.com",
  messagingSenderId: "144242326013",
  appId: "1:144242326013:web:787d693b988ab5b9ba8194"
};

const myFirebase = firebase.initializeApp(firebaseConfig);
const baseDb = myFirebase.firestore();
export const db = baseDb;
export default myFirebase;