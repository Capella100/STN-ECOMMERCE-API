//import express
const express = require('express');
// create router from express
const router = express.Router();

//importing our controllers(api) into our routes
const { register, login, logout } = require('../controllers/authcontroller.js');

//routes
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get( logout );

module.exports = router;