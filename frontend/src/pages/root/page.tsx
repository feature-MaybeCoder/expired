import { ABOUT_ROUTES } from "@/constants/routes/about"
import { DASHBOARD_ROUTES } from "@/constants/routes/dashboard"
import { authService } from "@/services/auth"
import { useEffect } from "react"

export default function RootPage() {
    useEffect(() => {
        if (authService.isCurrentUserSignedIn()) {
            location.replace(DASHBOARD_ROUTES.dashboard)
        } else {
            location.replace(ABOUT_ROUTES.about)
        }
    }, [])
    
    return <></>
}