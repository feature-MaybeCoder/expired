// Import the necessary Firebase modules
import {getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import "firebase/auth";
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


getAuth().onAuthStateChanged((user) => {
  if (user) {
    console.log("Auth changed user: ", user)
    firebaseAuthApp.updateCurrentUser(user)
    const getAccessToken = user.getIdToken()
    getAccessToken.then((accessToken) => {
      authService.processUserLoggedIn(accessToken, user.refreshToken)
    })
    getAccessToken.catch((error) => {
      console.error(error)
      authService.processNotLoggedInUser()
    })
    
  }
 
}
)

getAuth().onIdTokenChanged((user) => {
  if (user) {
    const getIdToken = user.getIdToken(true)
    getIdToken.then((idToken) => {
      authService.processUserLoggedIn(idToken, user.refreshToken)
    })
    getIdToken.catch((error) => {
      if (location.pathname !in ROUTES_ALLOWED_WITHOUT_LOGIN){
        console.error(error)
        authService.processNotLoggedInUser()
      }
      
    })
  } else {
    authService.processNotLoggedInUser()
  }
})