import userService from "../services/user.service.js";
import NotFoundError from "../utils/Errors/NotFoundError.js";
import ValidationError from "../utils/Errors/ValidationError.js";
import utils from "../utils/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        let userObjectToSave = { ...req.body, password: hashedPassword };
        const newUser = await userService.create(userObjectToSave);
        res.status(201).json(utils.createSuccessDataResult(201, newUser));
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const userFound = await userService.findByUserName(req.body.userName);

        if (!userFound) {
            throw new NotFoundError("User not found.");
        }

        const passwordIsValid = await bcrypt.compare(
            req.body.password,
            userFound.password
        );

        if (!passwordIsValid) {
            throw new ValidationError("Password is invalid.", null);
        }

        const token = jwt.sign(
            { userName: userFound.userName },
            process.env.JWT_SECRET,
            {
                expiresIn: 86400,
            }
        );

        res.status(200).json(
            utils.createSuccessDataResult(
                200,
                { ...userFound._doc, token: token },
                null,
                "Login successful."
            )
        );
    } catch (error) {
        next(error);
    }
};

export default {
    register,
    login,
};
