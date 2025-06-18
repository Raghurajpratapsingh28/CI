import { Router } from "express";
import { register } from "../controllers/authController";
import { requireAuth } from "@clerk/express";

const authRouter = Router();

authRouter.post("/sync-user", requireAuth(), register);

export default authRouter;