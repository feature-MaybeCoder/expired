import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { REGISTER_ROUTES } from "@/constants/routes/register"
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router"
import { loginService } from "@/services/login"
import { CardDescriptionWithError } from "./ui/card_description_with_error"
import { EmailInput } from "./ui/email_input"


export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [emailState, setEmailState] = useState("")
  const [passwordState, setPasswordState] = useState("")
  const [descriptionState, descriptionChangeState] = useState("Enter your email below to login to your account.")
  const [errorState, errorChangeState] = useState(false)

  const navigate = useNavigate()

  const login = (email: string, raw_password: string) => {
    const tryLogin = loginService.loginWithEmailAndPassword(email, raw_password)

    tryLogin.then((loginData) => {
      if (loginData.redirectPath) {
        navigate(loginData.redirectPath)
      }
    })
    tryLogin.catch((error) => {
      console.log("Login error")
      errorChangeState(true)
      if (error instanceof Error) {
        descriptionChangeState(error.message)
      } else (
        descriptionChangeState("Unexpected error!")
      )
      console.error(error)
    })

  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    login(emailState, passwordState)

  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescriptionWithError isError={errorState}>
            {descriptionState}
          </CardDescriptionWithError>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <EmailInput
                  className=""
                  value={emailState}
                  onChange={(e) => {setEmailState(e.target.value)}}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                isError={false}
                errorMessages={[""]}
                onChange={(e) => {setPasswordState(e.target.value)}}
                value={passwordState}
                id="password"
                type="password"
                required 
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href={REGISTER_ROUTES.register} className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
