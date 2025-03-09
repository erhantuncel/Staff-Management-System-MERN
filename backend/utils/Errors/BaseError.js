export default class BaseError extends Error {
    constructor(message) {
        super(message)
        this.statusCode = 500
    }
}