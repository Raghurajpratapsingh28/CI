import { Request, Response, NextFunction } from "express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { config } from "../config/config";
import logger from "../config/logger";

interface CustomError extends Error {
    statusCode?: number;
    details?: any;
}

const errorHandler = (
    err: CustomError,
    req: Request,
    res: Response,
    _next: NextFunction
): void => {
    const isProduction = config.node_env === "production";

    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    if (err instanceof PrismaClientKnownRequestError) {
        switch (err.code) {
            case "P2002":
                const field = (err.meta?.target as string[])?.join(", ");
                statusCode = 409;
                message = `Duplicate value for field(s): ${field}`;
                break;

            case "P2025":
                statusCode = 404;
                message = "Record not found";
                break;

            default:
                statusCode = 400;
                message = `Prisma error: ${err.message}`;
                break;
        }
    }

    logger.error(`[${req.method}] ${req.originalUrl} -> ${message}`);
    logger.error(err.stack || "No stack trace");

    res.status(statusCode).json({
        success: false,
        error: message,
        ...(err.details ? { details: err.details } : {}),
        ...(isProduction ? {} : { stack: err.stack }),
    });
};

export default errorHandler;
