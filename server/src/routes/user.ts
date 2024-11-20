import { signUp } from "@/controllers/user";
import { Router } from "express";

const userRouter = Router();

userRouter.post("/signup", signUp);

export default userRouter;
