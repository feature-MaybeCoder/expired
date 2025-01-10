const firebase = require('firebase/app');
const firebaseAuth = require('firebase/auth');
var prompt = require('prompt-sync')();


function main(){
   const firebaseConfig = {
      apiKey: "AIzaSyDQWYgYssWJVe9_I4MRq1g6OKfCCR3Otis",
      authDomain: "expired-aaaac.firebaseapp.com",
      projectId: "expired-aaaac",
      storageBucket: "expired-aaaac.firebasestorage.app",
      messagingSenderId: "83726398421",
      appId: "1:83726398421:web:ce50f07e5eaf0551c4835c",
      measurementId: "G-LVW1FL9JRE"
    };
    
    const customToken = prompt("Enter custom token: ");
    if (!customToken) {
       throw new Error("Invalid custom token");
    }
    
    // Initialize Firebase
    const app = firebase.initializeApp(firebaseConfig);
    const defaultAuth = firebaseAuth.initializeAuth(app);
    
    
   const tryFirebaseAuth = firebaseAuth.signInWithCustomToken(defaultAuth, customToken);

   tryFirebaseAuth.then((userCreds) => {
      const tryGetIdToken = userCreds.user.getIdToken()
      tryGetIdToken.then((idToken) => {
         console.log("\n\n\n\n\n\n\n\n\n\n")
         console.log("####################")
         console.log("Your id token:")
         console.log("####################")
         console.log(idToken)
      })
   })

    
}


main()