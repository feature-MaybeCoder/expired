// Import the necessary Firebase modules
import {browserSessionPersistence, getAuth, setPersistence } from "firebase/auth";
import { initializeApp } from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
apiKey: "AIzaSyDQWYgYssWJVe9_I4MRq1g6OKfCCR3Otis",
  authDomain: "expired-aaaac.firebaseapp.com",
  projectId: "expired-aaaac",
  storageBucket: "expired-aaaac.firebasestorage.app",
  messagingSenderId: "83726398421",
  appId: "1:83726398421:web:ce50f07e5eaf0551c4835c",
  measurementId: "G-LVW1FL9JRE"
}

const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuthApp = getAuth(firebaseApp)

// firebaseAuthApp.onAuthStateChanged((user) => {
//   if (user) {
//     firebaseAuthApp.updateCurrentUser(user)
//   } else {
//     firebaseAuthApp.updateCurrentUser(null)
//   }
// })

await setPersistence(firebaseAuthApp, browserSessionPersistence); // Changes persistence to session only