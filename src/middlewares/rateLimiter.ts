import rateLimit from "express-rate-limit";
import logger from "../config/logger";
import { Request, Response, NextFunction } from "express";

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later",
    handler: (req: Request, res: Response, _next: NextFunction, options: any) => {
        logger.warn(`Rate limit exceeded for IP: ${req.ip}`);
        res.status(options.statusCode).json({
            message: options.message,
        });
    },
});

export default limiter;
