import BaseError from "./BaseError.js";

export default class NotFoundError extends BaseError {
    constructor(message) {
        super(message);
        this.statusCode = 404
    }
}