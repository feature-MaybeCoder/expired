import { AUTH_ROUTES, ROUTES_ALLOWED_WITHOUT_LOGIN } from "@/constants/auth"
import { LOGIN_ROUTES } from "@/constants/routes/login"
import { ROOT_ROUTES } from "@/constants/routes/root"
import { sessionAccessTokenName } from "@/constants/security"

class AuthService{

    /**
     * processNotLoggedInUser
     */
    public processNotLoggedInUser() { 
        localStorage.removeItem(sessionAccessTokenName)
        
        if (location.pathname !in ROUTES_ALLOWED_WITHOUT_LOGIN) {
            location.replace(LOGIN_ROUTES.login)
        }
    }
    
    /**
     * processUserLoggedIn
     */
    public processUserLoggedIn(accessToken: string) {
        localStorage.setItem(sessionAccessTokenName, accessToken)
        if (location.pathname !in AUTH_ROUTES) {
            location.replace(ROOT_ROUTES.root)
        }
    }
}

export const authService = new AuthService()