import { AUTH_ROUTES, ROUTES_ALLOWED_WITHOUT_LOGIN } from "@/constants/auth"
import { DASHBOARD_ROUTES } from "@/constants/routes/dashboard"
import { LOGIN_ROUTES } from "@/constants/routes/login"
import { sessionAccessTokenName, sessionCookieLifetimeDays, sessionCookieName } from "@/constants/security"
import Cookies from "universal-cookie"


const cookies = new Cookies()


class AuthService{
    /**
     * getCurrentUser
     */
    public isCurrentUserSignedIn() {
        
        return cookies.get(sessionCookieName) != null
    }

    /**
     * processNotLoggedInUser
     */
    public processNotLoggedInUser() { 
        console.warn("User wasnt log in")
        localStorage.removeItem(sessionAccessTokenName)
        cookies.remove(sessionCookieName)
        
        if (location.pathname !in ROUTES_ALLOWED_WITHOUT_LOGIN) {
            location.replace(LOGIN_ROUTES.login)
        }
    }
    
    /**
     * processUserLoggedIn
     */
    public processUserLoggedIn(accessToken: string, refreshToken: string) {
        const now = new Date()
        const exporationDate = new Date()
        exporationDate.setDate(now.getDate() + sessionCookieLifetimeDays)
        localStorage.setItem(sessionAccessTokenName, accessToken)
        cookies.set(
            sessionCookieName,
            refreshToken,
            {
                expires: exporationDate,
                path: '/'
            }
        )

        if (location.pathname in AUTH_ROUTES) {
            location.replace(DASHBOARD_ROUTES.dashboard)
        }
    }
}

export const authService = new AuthService()