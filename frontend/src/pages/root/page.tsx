import { ABOUT_ROUTES } from "@/constants/routes/about"
import { DASHBOARD_ROUTES } from "@/constants/routes/dashboard"
import { authService } from "@/services/auth"

export default function RootPage() {
    if (authService.isCurrentUserSignedIn()) {
        location.replace(DASHBOARD_ROUTES.dashboard)
    } else {
        location.replace(ABOUT_ROUTES.about)
    }

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        </div>
    )
}
