const { CustomError, UnauthenticatedError } = require("../errors");
const { isTokenValid } = require("../utilityFunctions");

const authenticateUser = async (req, res, next) => {
    // getting our token form the cookies
    const token = req.signedCookies.token;

    if (!token) {
        throw new UnauthenticatedError('Authentication is Invalid');
    }
    try {
        const { name, userId, role } = isTokenValid({ token });
        req.user = { name, userId, role };
        next();
    } catch (error) {
        throw new UnauthenticatedError('Authentication is invalid');
    }
}

module.exports = {
    authenticateUser
}