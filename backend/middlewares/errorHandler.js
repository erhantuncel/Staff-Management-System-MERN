import utils from "../utils/index.js";

export const errorHandler = (err, req, res, next) => {
    console.log(err.statusCode);
    res.status(err.statusCode || 500).json(
        utils.createErrorResult(err.statusCode || 500, err)
    );
};
