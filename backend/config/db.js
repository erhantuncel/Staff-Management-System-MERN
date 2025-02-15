import mongoose from "mongoose";

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

export const connectDb = async () => {
    try {
        const uri = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authsource=admin`;
        mongoose
            .connect(uri)
            .then(() => console.log(`Connected to database: ${DB_NAME}`))
            .catch((err) => {
                console.log(`Error: ${err}`);
                process.exit(1);
            });
    } catch (error) {}
};
