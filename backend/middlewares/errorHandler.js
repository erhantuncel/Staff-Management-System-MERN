import utils from "../utils/index.js";
import logger from "../utils/logger.js";

export const errorHandler = (err, req, res, next) => {
    logger.error(err);
    res.status(err.statusCode || 500).json(
        utils.createErrorResult(err.statusCode || 500, err)
    );
};
