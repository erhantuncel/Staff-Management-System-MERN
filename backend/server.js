import "dotenv/config";
import express from "express";
import { connectDb } from "./config/db.js";
import { swaggerOptions } from "./config/swaggerOptions.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import routes from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import logger from "./utils/logger.js";

const app = express();

const PORT = process.env.PORT || 5000;

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());
app.use("/api", routes);
app.use(errorHandler);

app.listen(PORT, () => {
    connectDb();
    logger.info(`Sever started at http://localhost:${PORT}`);
});
