const createSuccessResult = (statusCode, message) => ({
    status: "success",
    statusCode: statusCode,
    message: message,
});

const createSuccessDataResult = (statusCode, data, metadata, message) => ({
    status: "success",
    statusCode: statusCode,
    message: message,
    metadata: !metadata ? undefined : metadata,
    data: data,
});

const createErrorResult = (statusCode, error) => ({
    status: "error",
    statusCode: statusCode,
    message: "Error occured in API Server.",
    error: {
        message: error.message,
        invalidFields: error.invalidFields,
    },
});

const createErrorDataResult = (statusCode, message, error, data) => ({
    status: "error",
    statusCode: statusCode,
    message: message,
    data: data,
    error: {
        message: error.message,
        invalidFields: error.invalidFields,
    },
});

const getInvalidFields = (error) => {
    let errors = {};

    Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
    });
    return errors;
};

export default {
    createSuccessResult,
    createErrorResult,
    createSuccessDataResult,
    createErrorDataResult,
    getInvalidFields,
};
