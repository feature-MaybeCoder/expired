import { testAuthApiV1AuthPasswordTestGet } from "@/api"
import { apiClient } from "@/api/client"
import { ButtonWithUrl } from "@/components/ui/button_with_url"
import { Label } from "@/components/ui/label"
import { LOGOUT_ROUTES } from "@/constants/routes/logout"
import { useEffect } from "react"

export default function DashboardPage() {
    useEffect(() => {
        const test = testAuthApiV1AuthPasswordTestGet(
            {
                client: apiClient,
                method: "GET"
            }
        )
        test.then(() => {
            console.log("success")
        }
        )
        test.catch((error) => {
            console.error(error)
        }) 
    })
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="grid gap-9">
                <Label>A dashboard for authenticated users</Label>
                <ButtonWithUrl url={LOGOUT_ROUTES.logout}>
                    Logout
                </ButtonWithUrl>
            </div>
            
        </div>
    )
}