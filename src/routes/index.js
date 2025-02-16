const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.js')
const speciesRoutes = require('./species.js');
const animalsRoutes = require('./animals.js');
const usersRoutes = require('./users.js')

//Home page
router.get('/', (req, res) => {
  res.render('home')
});

router.use('/species', speciesRoutes); //Mounting species routes
router.use('/animals', animalsRoutes); //Mounting animals routes
router.use('/auth', authRoutes); //Mounting authentication routes
router.use('/users', usersRoutes); //Mounting users routes

module.exports = router;