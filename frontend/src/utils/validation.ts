
import * as EmailValidator from 'email-validator';
 

export function validateEmail(email: string){
    return EmailValidator.validate(email)
}

export function validatePasswordForRegister(password: string): boolean{
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
    return regex.test(password)
}
    