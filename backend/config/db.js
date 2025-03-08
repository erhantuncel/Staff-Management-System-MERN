import mongoose from "mongoose";
import logger from "../utils/logger.js";

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

export const connectDb = async () => {
    try {
        const uri = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authsource=admin`;
        mongoose
            .connect(uri)
            .then(() => logger.info(`Connected to database: ${DB_NAME}`))
            .catch((err) => {
                console.log(`Error: ${err}`);
                process.exit(1);
            });
    } catch (error) {
        console.log("Db connect error.");
    }
};

export const disconnectDb = async () => {
    try {
        await mongoose.connection.close();
    } catch (error) {
        console.log("Db diconnect error.");
    }
};
