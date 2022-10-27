
const { StatusCodes } = require('http-status-codes');
// required our user model
const User = require('../models/User');
// importing our errors
const { BadRequest, UnauthenticatedError } = require('../errors');
const { createToken, attachCookiesToResponse } = require('../utilityFunctions/index');

const register = async (req, res, next) => {
    //got our user details from req.body
    const { name, email, password } = req.body;
    // checking if it is already an existing  email
    const emailAlreadyExist = await User.findOne({ email });
    if (emailAlreadyExist) {
        return next(new BadRequest('Email already exist'));
    }

    //here we created a user and sent a response
    const user = await User.create({ name, email, password });
    //creating userToken and attaching cookies
    const userToken = createToken(user);
    attachCookiesToResponse({ res, user: userToken });

    res.status(StatusCodes.CREATED).json({ user })
}
const login = async (req, res) => {
    // we are email and password to login, so we got it from our req.body.
    const { email, password } = req.body;
    //checking if email and password isprovided
    if (!email || !password) {
        // if no, you throw ur badRequestErroor
        throw new BadRequestError('please provide email and password');
    }
    // getting a user from the db by eamil. which will hav access to all the methos in there.
    const user = await User.findOne({ email });
    // checking if the user exists if no, return an UnauthenticatedError
    if (!user) {
        throw new UnauthenticatedError('Invalid credentials');
    }
    // if user dose exsit then u compare password. which we did in the models folder
    const isPasswordCorrect = await user.comparePassword(password);
    //checking if password is correct
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid credentials');
    }
    // creating a token for the user
    const userToken = createToken(user);

    // creating a method to set our cookies(we ar going to use for logout)
    attachCookiesToResponse({ res, user: userToken })

    res.status(StatusCodes.OK).json({ user: userToken })
}
const logout = async (req, res) => {
    // getting our cookie and giving it a value of logout.
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now() + 1000),
    });
    res.status(StatusCodes.OK).json({ msg: 'user logged out' })
}

module.exports = {
    register,
    login,
    logout
}
