import { testAuthApiV1AuthPasswordTestGet } from "@/api"
import { apiClient } from "@/api/client"
import { Label } from "@/components/ui/label"

export default function DashboardPage() {
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
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <Label>A dashboard for authenticated users</Label>
        </div>
    )
}