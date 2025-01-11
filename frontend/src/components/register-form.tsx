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
import { ChangeEvent, FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom";
import { ROOT_ROUTES } from "@/constants/routes/root"
import { registrationService } from "@/services/register"
import { EmailInput } from "./ui/email_input"
import { CardDescriptionWithError } from "./ui/card_description_with_error"
import { validatePasswordForRegister } from "@/utils/validation"

import { LOGIN_ROUTES } from "@/constants/routes/login"

      

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [errorState, errorChangeState] = useState(false)
  const [descriptionState, descriptionChangeState] = useState("Enter your email below to create your account.")
  const [emailState, emailChangeState] = useState("")
  const [passwordState, passwordChangeState] = useState({
      value: "",
      errorTexts: [""],
      isError: false
    }
)

  const navigate = useNavigate()

  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {

      let password = event.target.value
      if (password == undefined) {
        password = ""
      }
      const errors = validatePasswordForRegister(password)
      passwordChangeState(
        {
          value: event.target.value,
          isError: errors.length != 0,
          errorTexts: errors
        }
      )
  }
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // Check errors
    if (passwordState.isError) {
      errorChangeState(true)
      descriptionChangeState(
        "Invalid email or password"
      )

    } else {
      const registrationAttempt = registrationService.registerWithEmailAndPassword(
        emailState,
        passwordState.value
      )
  
      registrationAttempt.then(() => {
        navigate(ROOT_ROUTES.root)
      }
      )
      registrationAttempt.catch((error) => {
        errorChangeState(true)
        if (error instanceof Error) {
          descriptionChangeState(
            error.message
          )
        } else {
          descriptionChangeState(
            "Unknown error"
          )
        }
        
      }
      )
    }
    
  }

return (
  <div className={cn("flex flex-col gap-6", className)} {...props}>
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Sign up</CardTitle>
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
              onChange={(e) => {emailChangeState(e.target.value)}}
              id="email"
              type="email"
              placeholder="email@example.com"
              required
            />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
              isError={passwordState.isError}
              errorMessages={passwordState.errorTexts}
              value={passwordState.value}
              onChange={onPasswordChange}
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
            Already have an account?{" "}
            <a href={LOGIN_ROUTES.login} className="underline underline-offset-4">
              Login
            </a>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
)

}

