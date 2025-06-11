import userService from "../services/user.service.js";
import utils from "../utils/index.js";
import bcrypt from "bcrypt";

const createUser = async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        let userObjectToSave = { ...req.body, password: hashedPassword };
        const newUser = await userService.create(userObjectToSave);
        res.status(201).json(utils.createSuccessDataResult(201, newUser));
    } catch (error) {
        next(error);
    }
};

export default {
    createUser,
};
