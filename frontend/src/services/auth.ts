import { AUTH_ROUTES, ROUTES_ALLOWED_WITHOUT_LOGIN } from "@/constants/auth"
import { LOGIN_ROUTES } from "@/constants/routes/login"
import { ROOT_ROUTES } from "@/constants/routes/root"
import { sessionAccessTokenName } from "@/constants/security"
import { getAuth } from "firebase/auth"

class AuthService{

    /**
     * processNotLoggedInUser
     */
    public processNotLoggedInUser() {
        const currentLocation = location.pathname
        localStorage.removeItem(sessionAccessTokenName)

        const removeFirebaseUser = getAuth().updateCurrentUser(null)
        removeFirebaseUser.catch((error) => {
            console.error(error)
        })
        
        if (currentLocation !in ROUTES_ALLOWED_WITHOUT_LOGIN) {
            location.replace(LOGIN_ROUTES.login)
        }
    }
    
    /**
     * processUserLoggedIn
     */
    public processUserLoggedIn() {
        if (location.pathname !in AUTH_ROUTES) {
            location.replace(ROOT_ROUTES.root)
        }
    }
}

export const authService = new AuthService()