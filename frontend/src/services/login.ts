import { passwordAuthApiV1AuthPasswordAuthenticatePost } from "@/api/sdk.gen";
import { apiClient } from "@/api/client";
import { ROOT_ROUTES } from "@/constants/routes/root"
import { signInWithCustomToken } from "firebase/auth"
import { firebaseAuthApp } from "@/firebase"
import Cookies from "universal-cookie";
import { sessionCookieName } from "@/constants/security";
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
        const result = new LoginData("")

        try {
          const response = await passwordAuthApiV1AuthPasswordAuthenticatePost(
            {
              client: apiClient,
              body: {
                email: email,
                raw_password: raw_password,
              }
            },
          )

          if (response.data){
            const userCreds = await signInWithCustomToken(
              firebaseAuthApp,
              response.data.access_token
            )

            await firebaseAuthApp.updateCurrentUser(userCreds.user)
            cookies.set(sessionCookieName, userCreds.user.refreshToken)
            result.redirectPath = ROOT_ROUTES.root 

          } else {
            throw defaultLoginError
          }
        } catch (error) {
          if (error instanceof Error) {
            console.error(error)
            throw defaultLoginError
          }
        }

    return result
}
}

export const loginService = new LoginService()