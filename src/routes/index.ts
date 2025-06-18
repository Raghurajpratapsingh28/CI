import { Router } from "express";
import authRouter from "./authRoutes";
import userRouter from "./userRoutes";

const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);

export default router;