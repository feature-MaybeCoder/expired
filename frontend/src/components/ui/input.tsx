

import { cn } from "@/lib/utils"
import {InputHTMLAttributes } from "react"

export interface InputProps   
extends InputHTMLAttributes<HTMLInputElement>
{
  errorMessages: string[]
  isError: boolean
}

const Input = ({ className, type, errorMessages, isError = false, ...props }: InputProps) => {
    const prepareErrors = () => {
      const displayErrors: JSX.Element[] = []
      if (isError) {
        className += " border-red-600 "
        for (let i = 0; i < errorMessages.length; i++) {
          const errorMessage = errorMessages[i];
          displayErrors.push(
            <div>
            <p className="text-red-600 text-left p-1">{errorMessage}</p>
            </div>
          )
        }
        
      }
      return displayErrors
    }
    
    
    return (
      <div>
        <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        {...props}
      />
      {prepareErrors()}
      </div>
      
    )
  }

Input.displayName = "Input"

export { Input }
