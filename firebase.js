// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5_9wOwmmITAyS9GFXO21rgcgObbpVwrM",
  authDomain: "tonight-3-0.firebaseapp.com",
  projectId: "tonight-3-0",
  storageBucket: "tonight-3-0.appspot.com",
  messagingSenderId: "769882301169",
  appId: "1:769882301169:web:8f1a3843b210c39e30bf50",
  measurementId: "G-293TH9CEX5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export { db };

