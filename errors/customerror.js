class CustomError extends Error {
    constructor(message, statuscode) {
        super(message, statuscode);
    }
}

// const createCustomError = (msg, statusCode) => {
//     return new CustomAPIError(msg, statusCode)
// }


module.exports = {
    CustomError
    // createCustomError,
};
