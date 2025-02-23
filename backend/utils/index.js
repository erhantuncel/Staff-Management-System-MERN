const createErrorMessage = (error) => {
    let message;
    if (error.name === "ValidationError") {
        let errors = {};

        Object.keys(error.errors).forEach((key) => {
            errors[key] = error.errors[key].message;
        });
        message = { validationErrors: errors };
    } else {
        message = error.message;
    }
    return message;
};

export default { createErrorMessage };
