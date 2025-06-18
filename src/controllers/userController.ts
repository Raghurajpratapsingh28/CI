import { NextFunction, Request, Response } from "express";
import userService from "../services/user.service";
import logger from "../config/logger";
import { getAuth } from "@clerk/express";

const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = getAuth(req);

        if (!userId) {
            res.status(400).json({ success: false, message: "User ID is missing." });
            return;
        }

        const user = await userService.findUserById(userId);

        if (!user || user.isDeleted) {
            logger.warn(`User not found or is deleted. ID: ${userId}`);
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }

        const { isDeleted, otp, otpExpiry, ...safeUser } = user;

        logger.info(`Successfully retrieved user: ${userId}`);
        res.status(200).json({ success: true, user: safeUser });
    } catch (error) {
        logger.error("Error in getUser:", error);
        return next(error);
    }
};

const updateProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { userId } = getAuth(req);

        if (!userId) {
            res.status(400).json({ success: false, message: "User ID is missing." });
            return;
        }

        const user = await userService.findUserById(userId);

        if (!user) {
            res.status(404).json({ success: false, message: "User not found." });
            return;
        }

        const allowedFields = [
            "name",
            "city",
            "state",
            "whatsappMobile",
            "imageURL",
            "coverURL",
            "latitude",
            "longitude",
        ];

        const updateData: any = {};

        for (const key of allowedFields) {
            if (req.body[key] !== undefined) {
                updateData[key] = req.body[key];
            }
        }

        const updatedUser = await userService.updateProfile(userId, updateData);

        const { isDeleted, otp, otpExpiry, ...safeUser } = updatedUser;

        logger?.info?.(`User profile updated: ${userId}`);
        res.status(200).json({ success: true, user: safeUser });
        return;
    } catch (error) {
        logger?.error?.("Failed to update user profile", error);
        return next(error);
    }
};

const deleteProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { userId } = getAuth(req);

        if (!userId) {
            res.status(400).json({ success: false, message: "User ID is missing." });
            return;
        }

        const user = await userService.findUserById(userId);
        if (!user || user.isDeleted) {
            logger.warn(`User not found or already deleted. ID: ${userId}`);
            res
                .status(404)
                .json({ success: false, message: "User not found." });
            return;
        }

        await userService.deleteProfile(userId);

        logger.info(`Successfully delete user: ${userId}`);
        res
            .status(200)
            .json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        logger.error("Error in deleteUser:", error);
        return next(error);
    }
};

export { getUser, updateProfile, deleteProfile };
