//required express
const express = require('express');
// importing our APIS from controller folder..
const { getAllUsers, getSingleUser, updateUser, showCurrentUser, updatePassword } = require('../controllers/userController');
const { authenticateUser } = require('../middleware/authentication');

// created our router off it
const router = express.Router();

//create our routes
router.route('/').get(authenticateUser, getAllUsers);
router.route('/updateUser').patch(authenticateUser, updateUser);
router.route('/showMe').get(authenticateUser, showCurrentUser);
router.route('/updatePassword').patch(authenticateUser, updatePassword)
router.route('/:id').get(authenticateUser, getSingleUser);


// we export our router
module.exports = router;