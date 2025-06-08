import User from "../db/user.model.js";
import utils from "../utils/index.js";
import ValidationError from "../utils/Errors/ValidationError.js";

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

export default { create };
