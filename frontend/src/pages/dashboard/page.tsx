import { testAuthApiV1AuthPasswordTestGet } from "@/api"
import { apiClient } from "@/api/client"
import { AuthContext } from "@/components/auth/auth-context"
import { ButtonWithUrl } from "@/components/ui/button_with_url"
import { Label } from "@/components/ui/label"
import { LOGOUT_ROUTES } from "@/constants/routes/logout"
import { useContext, useEffect } from "react"

export default function DashboardPage() {
    const authContext = useContext(AuthContext)
    let userWidget = <></>
    if (authContext && authContext.user) {
        userWidget = (
            <div>
                <Label>Your account:</Label>
                <p>{authContext.user.email}</p>
            </div>
        )
    }
    
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
                {userWidget}

                <Label>A dashboard for authenticated users</Label>
                <ButtonWithUrl url={LOGOUT_ROUTES.logout}>
                    Logout
                </ButtonWithUrl>
            </div>
            
        </div>
    )
}