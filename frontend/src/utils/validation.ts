
import * as EmailValidator from 'email-validator';
 

export function validateEmail(email: string){
    return EmailValidator.validate(email)
}



export function validatePasswordForRegister(password: string): string[]{
    interface ValidationRule {
        test: (password: string) => boolean;
        errorMessage: string;
      }
    
    if (password == undefined) {
        return [
            "Password cannot be empty"
        ]
    }
    const passwordValidationRules: ValidationRule[] = [
        {
          test: (password) => password.length >= 8,
          errorMessage: "Password must be at least 8 characters long.",
        },
        {
          test: (password) => /[A-Z]/.test(password),
          errorMessage: "Password must contain at least one uppercase letter.",
        },
        {
          test: (password) => /[a-z]/.test(password),
          errorMessage: "Password must contain at least one lowercase letter.",
        },
        {
          test: (password) => /\d/.test(password),
          errorMessage: "Password must contain at least one number.",
        },
        {
          test: (password) => /[@$!%*?&#]/.test(password),
          errorMessage: "Password must contain at least one special character (@$!%*?&#).",
        },
      ];
    
    const errors: string[] = []
    passwordValidationRules.forEach((rule) => {
        if (!rule.test(password)) {
        errors.push(rule.errorMessage)
        }
    })
    return errors

  
}
    