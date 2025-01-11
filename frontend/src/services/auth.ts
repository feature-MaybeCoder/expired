import { AUTH_ROUTES, ROUTES_ALLOWED_WITHOUT_LOGIN } from "@/constants/auth"
import { ABOUT_ROUTES } from "@/constants/routes/about"
import { DASHBOARD_ROUTES } from "@/constants/routes/dashboard"
import { sessionAccessTokenName, sessionCookieLifetimeDays, sessionCookieName } from "@/constants/security"
import { firebaseAuthApp } from "@/firebase"
import { onAuthStateChanged, signOut, User } from "firebase/auth"
import Cookies from "universal-cookie"


const cookies = new Cookies()


class AuthService{

    /**
     * subscribeToAuthChanges
    */
    public subscribeToAuthChanges = (callback: (user: User | null) => void) => {
        return onAuthStateChanged(firebaseAuthApp, callback);
      };

    /**
     * logoutCurrentUser
     */
    public async logoutCurrentUser() {
        localStorage.clear()
        await signOut(firebaseAuthApp)
    }

    /**
     * getCurrentUser
     */
    public isCurrentUserSignedIn() {
        return localStorage.getItem(sessionAccessTokenName) != null
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

    /**
     * processUserLoggedIn
     */
    public processUserAfterLogout() {
        if(location.pathname !in ROUTES_ALLOWED_WITHOUT_LOGIN) {
            location.replace(ABOUT_ROUTES.about)
        }
    }
}

export const authService = new AuthService()