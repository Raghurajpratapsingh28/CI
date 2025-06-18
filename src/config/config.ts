import dotenv from "dotenv";
dotenv.config();

export const config = {
    port: process.env.PORT,
    node_env: process.env.NODE_ENV,
    clerk_publishable_key: process.env.CLERK_PUBLISHABLE_KEY,
    clerk_secret_key: process.env.CLERK_SECRET_KEY,
};