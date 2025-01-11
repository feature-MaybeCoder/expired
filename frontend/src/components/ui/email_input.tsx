

import { validateEmail } from "@/utils/validation"
import {ChangeEvent, ChangeEventHandler, InputHTMLAttributes, useState } from "react"
import { Input } from "./input"

class EmailState{
    value: string
    errorText: string
    isError: boolean = false
  
    constructor(value: string, errorText: string, isError: boolean = false){
      this.value=value
      this.errorText=errorText
      this.isError=isError
    }
  }

interface EmailInputProps
extends InputHTMLAttributes<HTMLInputElement>
{
    className: string
    onChange: ChangeEventHandler<HTMLInputElement>
}


const EmailInput = ({ className, onChange, ...props }: EmailInputProps) => {
    const [emailState, setEmailState] = useState(
        new EmailState("", "")
      )

    const onEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event)
        let errorText = ""
        const isEmailValid = validateEmail(event.target.value)
        
        if (!isEmailValid){
          errorText = "Email is invalid!"
        }

        const newState = new EmailState(
          event.target.value,
          errorText,
          !isEmailValid
        )
        setEmailState(newState)
    }

    return (
      <div>
        <Input
        errorMessages={[emailState.errorText]}
        isError={emailState.isError}
        onChange={onEmailChange}
        type="email"
        className={className}
        value={emailState.value}
        {...props}
      />
      </div>
      
    )
  
}

EmailInput.displayName = "IEmailInputnput"

export { EmailInput }
