import { passwordAuthApiV1AuthPasswordAuthenticatePost } from "@/api/sdk.gen";
import { apiClient } from "@/api/client";
import { ROOT_ROUTES } from "@/constants/routes/root"
import { signInWithCustomToken } from "firebase/auth"
import { firebaseAuthApp } from "@/firebase"
import Cookies from "universal-cookie";
import { sessionAccessTokenName, sessionCookieName } from "@/constants/security";
import { defaultLoginError } from "@/errors/login";



class LoginData{
    public redirectPath: string

    constructor(redirectPath: string) {
        this.redirectPath = redirectPath
    }  
    
}
class LoginService{
    /**
     * login
     */
    public async login(email: string, raw_password: string): Promise<LoginData> {
        const cookies = new Cookies()
        const response = new LoginData("")
        const get_response = passwordAuthApiV1AuthPasswordAuthenticatePost(
          {
            client: apiClient,
            body: {
              email: email,
              raw_password: raw_password,
            }
          },
        )
        get_response.then((value) => {
          if (value.data){
            const getUserCreds = signInWithCustomToken(
              firebaseAuthApp,
              value.data.access_token
            )

            getUserCreds.then((userCreds) => {
              const getIdToken = userCreds.user.getIdToken()
              const updateCurrentUser = firebaseAuthApp.updateCurrentUser(userCreds.user)
              
              updateCurrentUser.catch((error) => {
                console.log(error)
                throw defaultLoginError
              })
    
              getIdToken.then((accessToken) => {
                  localStorage.setItem(sessionAccessTokenName, accessToken)
                  cookies.set(sessionCookieName, userCreds.user.refreshToken)
                  response.redirectPath = ROOT_ROUTES.root
                }   
            
              )
            }
            )
            getUserCreds.catch((error) => {
                console.log(error)
                throw defaultLoginError
            }
          )  
          } else {
            throw defaultLoginError
          }
        })
        get_response.catch((error) => {
            console.error(error)
            throw defaultLoginError
        }
        )
    return response
}
}

export const loginService = new LoginService()