import { apiClient } from "@/api/client"
import { passwordRegistrationApiV1AuthPasswordRegisterPost } from "@/api/sdk.gen"
import { sessionAccessTokenName, sessionCookieName } from "@/constants/security"
import { defaultRegistrationError } from "@/errors/register"
import { firebaseAuthApp } from "@/firebase"
import { signInWithCustomToken, UserCredential } from "@firebase/auth"
import Cookies from "universal-cookie"

class RegistrationService{
    /**
     * registerWithEmailAndPassword
     */
    public async registerWithEmailAndPassword(email: string, raw_password: string) {
        const response = await passwordRegistrationApiV1AuthPasswordRegisterPost(
            {
              client: apiClient,
              method: "POST",
              body: 
                {
                  email: email,
                  raw_password: raw_password
                }
            }
          )
      
        if (!response.data) {
            if (response.error && response.error?.detail){
                throw new Error(response.error.detail.toString()) 
            } else {
                throw new Error("Unexpected error.") 
            }
        } 
        
        const signInWithCustomTokenPromise = signInWithCustomToken(
            firebaseAuthApp, response.data.access_token
        )
        signInWithCustomTokenPromise.then((value: UserCredential) => {
            const cookies = new Cookies();
            cookies.set(sessionCookieName, value.user.refreshToken);

            const accessTokenPromise = value.user.getIdToken()  
            
            accessTokenPromise.then((value) => {
                    localStorage.setItem(sessionAccessTokenName, value)
                }
            )
            accessTokenPromise.catch((error) => {
                console.error(error)
                    throw new Error("Invalid email or password.")
                }
            )
            
            signInWithCustomTokenPromise.catch(
                (error) => {
                    console.error(error)
                    throw defaultRegistrationError
                }
            )
        }
        )
        await signInWithCustomTokenPromise
}
}


export const registrationService = new RegistrationService()