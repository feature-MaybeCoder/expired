import { Tuple } from "@reduxjs/toolkit";
import { ROOT_ROUTES } from "./routes/root";
import { REGISTER_ROUTES } from "./routes/register";
import { LOGIN_ROUTES } from "./routes/login";

export const ROUTES_ALLOWED_WITHOUT_LOGIN = new Tuple(
    [
        ROOT_ROUTES.root, REGISTER_ROUTES.register, LOGIN_ROUTES.login
    ]
)

export const AUTH_ROUTES = new Tuple(
    [
        REGISTER_ROUTES.register, LOGIN_ROUTES.login
    ]
)