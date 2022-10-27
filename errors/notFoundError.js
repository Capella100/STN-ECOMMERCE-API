// imported customerror 
const { CustomError } = require('./customerror');
// installed and required http-status-codes..
const { StatusCodes } = require('http-status-codes');

// created bad request error from custom error
class NotFoundError extends CustomError {
    constructor(message) {
        super(message);
        this.StatusCodes = StatusCodes.NOT_FOUND;
    }
}

module.exports = NotFoundError;