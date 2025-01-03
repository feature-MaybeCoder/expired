import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormEvent, useState } from "react"
import { passwordRegistrationApiV1AuthPasswordRegisterPost } from "@/api/index";
import { useNavigate } from "react-router-dom";
import { ROOT_ROUTES } from "@/constants/routes/root"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { apiClient } from "@/api/client";

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [emailState, emailChangeState] = useState("")
  const [passwordState, passwordChangeState] = useState("")
  const [registerFormState, setRegisterFormState] = useState({
      errorMessage: ""
    }
  )
  const navigate = useNavigate()
  let displayError = (<div></div>)

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const response = await passwordRegistrationApiV1AuthPasswordRegisterPost(
      {
        client: apiClient,
        method: "POST",
        body: 
          {
            email: emailState,
            raw_password: passwordState
          }
      }
    )


    if (response.error){
      let msg = "Unexpected error"
      if (response.error.detail) {
        msg = response.error.detail.toString()
      } else {
        
        console.error(response.error)
      }
      setRegisterFormState({
        errorMessage: msg
      })
      
    } else {
      console.log(response.data.access_token)
      console.log("Successful")
      navigate(ROOT_ROUTES.root)
    }
}

  if (registerFormState.errorMessage) {
    displayError = (
      <Alert>
        <AlertTitle className="left">Error!</AlertTitle>
        <AlertDescription>
          {registerFormState.errorMessage}
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sign up</CardTitle>
          {displayError}
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
          <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  value={emailState}
                  onChange={(e) => {emailChangeState(e.target.value) }}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                <Input
                value={passwordState}
                onChange={(e) => {passwordChangeState(e.target.value) }}
                id="password"
                type="password" 
                required />
              </div>
              <Button className="w-full">
                Sign up
              </Button>
              <Button variant="outline" className="w-full">
              Sign up with Google
              </Button>
            </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
