import { Label } from "@/components/ui/label";
import { LOGIN_ROUTES } from "@/constants/routes/login";

export default function AboutPage() {

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="align-[4px]">
                <Label>A page for not authenticated users</Label>
                <a className="border-s-black border-4" href={LOGIN_ROUTES.login}>Login</a>
            </div>
            
        </div>
    )
}