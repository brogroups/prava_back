import { Router } from "express";
import { validate } from "../../middlewares/validation.middleware";
import loginSchema from "./dto/login-auth.dto";
import { Login, SignUp } from "./auth.controller";
import SignUpSchema from "./dto/signup-auht.dto";

const AuthRouter = Router()

AuthRouter.post("/login",validate(loginSchema),Login)
AuthRouter.post("/signup",validate(SignUpSchema),SignUp)

export default AuthRouter   