import { useEffect, ReactNode, useState } from "react";
import { User } from "firebase/auth";
import { authService } from "@/services/auth";
import { AuthContext } from "./auth-context";


export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)

    const setCurrentUser = (user: User | null) => {
        console.log("Current user was set to: ", user)
        if (user) {
            setUser(user)
            const getAccessToken = user.getIdToken()
            getAccessToken.then((accessToken) => {
                authService.processUserLoggedIn(accessToken, user.refreshToken)
            })
            getAccessToken.catch((error) => {
                console.error(error)
                authService.logoutCurrentUser()
            })
        } else {
            setUser(null)
            authService.logoutCurrentUser()
        }
    }

    useEffect(() => {
        const unsubscribe = authService.subscribeToAuthChanges(setCurrentUser);
        return () => unsubscribe();
    }, []);

    return  <AuthContext.Provider value={{ user }}>
                {children}
            </AuthContext.Provider>
};
