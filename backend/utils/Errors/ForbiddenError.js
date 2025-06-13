import BaseError from "./BaseError.js";

export default class ForbiddenError extends BaseError {
    constructor(message) {
        super(message);
        this.statusCode = 403;
    }
}
