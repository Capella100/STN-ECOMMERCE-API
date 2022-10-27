// imported our Model.
const User = require('../models/User');
//import our status codes
const { StatusCodes } = require('http-status-codes');
const { NotFoundError, CustomError, BadRequest, UnauthenticatedError } = require('../errors');
const { createToken, attachCookiesToResponse } = require('../utilityFunctions');

// creating our api endpoints for getting all users
const getAllUsers = async (req, res) => {
    //finding users by role:users and removing the password.
    const users = await User.find({ role: 'user' }).select('-password');
    // responce USERS and also made use of our status code dependency;
    res.status(StatusCodes.OK).json({ users })
}

// creating our endpoint for geting a single user
const getSingleUser = async (req, res, next) => {
    //finding a user by id from req.params
    const user = await User.findOne({ _id: req.params.id }).select('-password');
    //if no user with id, throw not found error
    if (!user) {
        console.log("here", user)
        //throw new NotFoundError(`No user with id : ${req.params.id}`)
        return next(new NotFoundError(`No user with id : ${req.params.id}`))
    }
    // send user to client
    res.status(StatusCodes.OK).json({ user })
}

// creating endpoint to update a user
const updateUser = async (req, res, next) => {
    // getting our email and name from req.body.  
    const { email, name } = req.body;
    if (!name || !email) {
        return next(new CustomError('please provide both values'))
    }
    // geting our user by id
    const user = await User.findOne({ _id: req.user.userId });

    user.email = email;
    user.name = name;

    await user.save();
    // update user token and cookies
    const userToken = createToken(user);
    attachCookiesToResponse({ res, user: userToken });

    res.status(StatusCodes.OK).json({ user: userToken })
}

// creating an endpoint to show the current user
const showCurrentUser = async (req, res, next) => {
    res.status(StatusCodes.OK).json({ user: req.user })
}

const updatePassword = async (req, res, next) => {
    //geting old password and new password from req.body
    const { oldPassword, newPassword } = req.body;
    // checking if password was provided
    if (!oldPassword || !newPassword) {
        return next(new BadRequest('please provide both values'));
    }
    // getting our authenticated user from the db
    const user = await User.findOne({ _id: req.user.userId });
    // comparing the oldpassword and checking if it is correct
    const isPasswordCorrect = await user.comparePassword(oldPassword);
    if (!isPasswordCorrect) {
        return next(new UnauthenticatedError('Invalid Credentials'));
    }
    //saving the password
    user.password = newPassword;
    await user.save();

    res.status(StatusCodes.OK).json({ msg: 'Success!! Password Updated' });
}



module.exports = {
    getAllUsers,
    getSingleUser,
    updateUser,
    showCurrentUser,
    updatePassword
}