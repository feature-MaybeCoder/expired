import { ROOT_ROUTES } from "@/constants/routes/root"
import { authService } from "@/services/auth"

export default function LogoutPage() {
    const tryLogout = authService.logoutCurrentUser()
    tryLogout.then(() => {
        console.log("Logout successfull")
        location.replace(ROOT_ROUTES.root)
    })
    tryLogout.catch((error) => {
        console.error(error)
        location.replace(ROOT_ROUTES.root)
    })
    
    return <></>
}
