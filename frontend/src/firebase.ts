// Import the necessary Firebase modules
import {getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import "firebase/auth";
import { sessionAccessTokenName } from "./constants/security";
import { authService } from "./services/auth";
import { ROUTES_ALLOWED_WITHOUT_LOGIN } from "./constants/auth";

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

onAuthStateChanged(firebaseAuthApp, (user) => {
  if (user) {
    const getIdToken = user.getIdToken()
    getIdToken.then((idToken) => {
      localStorage.setItem(sessionAccessTokenName, idToken)
      authService.processUserLoggedIn()
    }
  )
    getIdToken.catch((error) => {
      console.error("Error trying to get id token: ", error)
      authService.processNotLoggedInUser()
    }
  )
    
  } else {
    authService.processNotLoggedInUser()
  }
});

firebaseAuthApp.onIdTokenChanged((user) => {
  if (user) {
    const getIdToken = user.getIdToken(true)
    getIdToken.then((idToken) => {
      localStorage.setItem(sessionAccessTokenName, idToken)
    })
    getIdToken.catch((error) => {
      if (location.pathname !in ROUTES_ALLOWED_WITHOUT_LOGIN){
        console.log()
        console.error(error)
        authService.processNotLoggedInUser()
      }
      
    })
  } else {
    authService.processNotLoggedInUser()
  }
})