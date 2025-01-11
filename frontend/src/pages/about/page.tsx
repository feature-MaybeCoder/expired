import { ButtonWithUrl } from "@/components/ui/button_with_url";
import { Label } from "@/components/ui/label";
import { LOGIN_ROUTES } from "@/constants/routes/login";
import { REGISTER_ROUTES } from "@/constants/routes/register";

export default function AboutPage() {

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="grid gap-4">
                <Label className="mb-3">A page for not authenticated users</Label>
                <ButtonWithUrl url={LOGIN_ROUTES.login}>
                    Login
                </ButtonWithUrl>
                    
                <ButtonWithUrl url={REGISTER_ROUTES.register}>
                    Register
                </ButtonWithUrl>  
            </div>
            
        </div>
    )
}