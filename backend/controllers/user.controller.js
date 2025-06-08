import userService from "../services/user.service.js";
import utils from "../utils/index.js";

const createUser = async (req, res, next) => {
    try {
        let userObjectToSave = req.body;
        const newUser = await userService.create(userObjectToSave);
        res.status(201).json(utils.createSuccessDataResult(201, newUser));
    } catch (error) {
        next(error);
    }
};

export default {
    createUser,
};
