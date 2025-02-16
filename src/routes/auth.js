const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const crypto = require('crypto')

//Passport: Local strategy
passport.use(
  new LocalStrategy(async (username, password, cb) => {
    const user = await authController.getUserByName(username); //Gets the user from database

    if (!user) return cb(null, false);

    const userPassword = Buffer.from(user.encryptedpassword)
    const salt = Buffer.from(user.salt)
    
    //what pkbdf2Sync does is hash a password
    const enteredPasswordHashed = crypto.pbkdf2Sync(password, salt, 310000, 32, 'sha256')
    
    
    //timingSafeEqual will compare two hashed passwords
    const passwordsMatch = crypto.timingSafeEqual(userPassword, enteredPasswordHashed)


    if (!passwordsMatch) return cb(null, false);

    return cb(null, user);
  })
);

//Passport: Serialization
// Serialization is the process of converting the user object into a format (usually a unique identifier, like id) that can be saved in the session.
// passport.serializeUser((username, done) => {
//   done(null, username.username);
// });

passport.serializeUser((user, done) => {
  done(null, { id: user.id, username: user.username, role: user.role });
});

//Passpot: Deserialization
//Deserialization is the opposite, where Passport retrieves the user ID from the session and uses it to find the full user data.
passport.deserializeUser(async (userData, done) => {
  const user = await authController.getUserByName(userData.username); //Gets the user from database

  if (user) done(null, user);
  if (!user) done(new Error('User not found'), null);
});

// Roouting
router.route('/').get(authController.loginView).post(authController.login);

router.route('/signup').get(authController.signupView).post(authController.signup);

router.get('/logout', authController.logout);

module.exports = router;
