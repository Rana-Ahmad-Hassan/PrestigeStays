import { signUp } from "@/controllers/user";
import userValidateMiddleware from "@/zodValidations/user";
import { Router } from "express";

const userRouter = Router();

userRouter.post("/signup", userValidateMiddleware, signUp);

export default userRouter;
