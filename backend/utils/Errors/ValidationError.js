import BaseError from "./BaseError.js";

export default class ValidationError extends BaseError {
    constructor(message, invalidFields) {
        super(message);
        this.statusCode = 400
        this.invalidFields = invalidFields;
    }
}
