const express = require('express');
const router = express.Router();
const animalsController = require('../controllers/animalsController.js')
const authController =  require('../controllers/authController.js')

router.get('/', animalsController.getAllAnimals);

router.route('/add')
.get(authController.checkIfAuthorized, animalsController.addAnimalsPage)
.post(animalsController.createNewAnimal)

module.exports = router