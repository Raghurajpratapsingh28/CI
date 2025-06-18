import express, { Request, Response } from "express";
import { config } from "./config/config";
import logger from "./config/logger";
import morgan from "morgan";
import { clerkMiddleware } from '@clerk/express';
import limiter from "./middlewares/rateLimiter";
import router from "./routes";
import errorHandler from "./middlewares/errorHandler";

const app = express();

app.use(express.json());
app.use(morgan('combined', {
    stream: {
        write: (message) => logger.http(message.trim()),
    },
}));
app.use(limiter);
app.use(clerkMiddleware());

app.use("/api/v1", router);
app.use(errorHandler);

app.get("/", (req: Request, res: Response) => {
    logger.info("Root route hit");
    res.json({ msg: "Hello from PlanetX" });
});

const PORT = config.port || 8000;

app.listen(PORT, () => {
    console.log(`🚀 Server started on http://localhost:${PORT}`);
});