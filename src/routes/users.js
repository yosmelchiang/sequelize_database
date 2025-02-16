const express = require('express')
const router = express.Router();
const usersController = require('../controllers/usersController')
const authController = require('../controllers/authController.js')

router.get('/:userId', authController.canSeeUserDetails, usersController.showUserDetails)
module.exports = router;