import utils from "../utils/index.js";
import ForbiddenError from "../utils/Errors/ForbiddenError.js";
import UnauthorizedError from "../utils/Errors/UnauthorizedError.js";
import jwt from "jsonwebtoken";
import userService from "../services/user.service.js";

export const verifyToken = async (req, res, next) => {
    const token = req.headers["x-access-token"] || req.headers["authorization"];

    if (!token) {
        const forbiddenError = new ForbiddenError("No token provided.");
        res.status(forbiddenError.statusCode).json(
            utils.createErrorResult(forbiddenError.statusCode, forbiddenError)
        );
    } else {
        try {
            const decoded = jwt.verify(
                token.replace("Bearer ", ""),
                process.env.JWT_SECRET
            );
            const user = await userService.findByUserName(decoded.userName);
            if (!user) {
                new UnauthorizedError("This user is unauthorized.");
            }
            next();
        } catch (error) {
            next(error);
        }
    }
};
