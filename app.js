require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const routes = require('./src/routes'); //Node looks for index.js in routes so we dont need to specify anything here
const layouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('passport');

//Sessions
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  })
);

app.use(passport.session());
app.use(passport.initialize());

//Middleware to make authentication variables accessible for our views
//Pop it before app middleware and passport session anad initialize
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.userId = req.user ? req.user.id : null;
  res.locals.userName = req.user ? req.user.username : null;
  // console.log(res.locals.user)
  // req.session.passport - Serialized object can be found here though

  //Info
  // console.log('serialized user', req.session.passport) //Logs the serialized user which is created by passport.serializeUser()
  // console.log('deserialized User', req.user) //Logs deserialized which is called upon every request by passport.deserializeUser()
  next();
  
})

//App Settings
app.set('port', port);
app.set('view engine', 'ejs');
app.set('views', 'src/views'); //Setting the views folder
app.set('layout', 'layouts/main'); //Setting the layouts folder

//App Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(layouts); //Using express js layouts and setting the main layout file
app.use(express.static('src/public'));
app.use('/', routes);

module.exports = app;
