import User from "../db/user.model.js";
import utils from "../utils/index.js";
import ValidationError from "../utils/Errors/ValidationError.js";
import NotFoundError from "../utils/Errors/NotFoundError.js";

const create = async (userObjectToSave) => {
    const userToSave = new User(userObjectToSave);
    const validationResult = userToSave.validateSync();
    if (validationResult) {
        throw new ValidationError(
            "User validation is failed.",
            utils.getInvalidFields(validationResult)
        );
    }
    return await userToSave.save();
};

const findByUserName = async (userName) => {
    if (!userName) {
        throw new ValidationError("Invalid or missing userName");
    }
    const userFound = await User.findOne({ userName: userName });
    if (!userFound) {
        throw new NotFoundError(`User with username ${userName} not found.`);
    }
    return userFound;
};

export default { create, findByUserName };
