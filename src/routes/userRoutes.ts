import { Router } from "express";
import { requireAuth } from "@clerk/express";
import {
    deleteProfile,
    getUser,
    updateProfile,
} from "../controllers/userController";

const userRouter = Router();

userRouter.get("/", requireAuth(), getUser);
userRouter.put("/", requireAuth(), updateProfile);
userRouter.delete("/", requireAuth(), deleteProfile);

export default userRouter;
