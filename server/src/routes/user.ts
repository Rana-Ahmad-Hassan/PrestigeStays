import { signUp } from "@/controllers/user";
import { Router } from "express";
import { validateHeaderValue } from "http";

const userRouter = Router();

userRouter.post("/signup", validateHeaderValue, signUp);

export default userRouter;
