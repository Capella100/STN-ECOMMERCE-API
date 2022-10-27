// creating our error handler middleware so we will be able to send our errors to the client.
const { StatusCodes } = require("http-status-codes");
const { CustomError } = require("../errors");

const errorHandlerMiddleware = (err, req, res, next) => {
    // const customError = {
    //     statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    //     msg: err.message || 'something went wrong, try again leter'
    // }
    if (err instanceof CustomError) {
        return res.status(err.StatusCodes).json({ msg: err.message })
        // return res.status(customError.statusCode).json({ msg: customError.message })
    }
    return res.status(500).json({ msg: 'something went wrong, please try again' })
}


module.exports = errorHandlerMiddleware