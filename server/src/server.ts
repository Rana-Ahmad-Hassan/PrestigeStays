import "tsconfig-paths/register";
import { Request, Response } from "express";
import dbConnect from "@/config/db";
import app from "@/app";
import env from "@/env";
import logger from "@/utils/logger";
import userRouter from "./routes/user";

app.use("/api/user", userRouter);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello from PrestigeStays");
});

const PORT = env.PORT;
dbConnect()
  .then(() => {
    app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    logger.error("Error starting server", error);
    process.exit(1);
  });
