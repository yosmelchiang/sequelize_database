class Authentication {
  constructor(passport, crypto, usersService) {
    this.passport = passport
    this.crypto = crypto
    this.usersService = usersService
  }

  //Authentication handler
  loginView = (req, res) => {
    res.render('auth/loginPage');
  };
  
  login = (req, res, next) => {
    if(req.isAuthenticated()) {
      return res.status(400).send('You are already logged in')
    }
  
    //This is a middleware and needs to be executed as so
    //Hhow do you run something as a middleware? Call it with (req, res, next)
    this.passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/auth'
    })(req, res, next);  // OBS! its important that next is provided, because a middleware uses all three parameters
      
  };
  
  signupView = (req, res) => {
    res.render('auth/signupPage')
  }
  
  signup = async (req, res) => {
      const { username, password, firstName, lastName } = req.body;
      const salt = this.crypto.randomBytes(16)
      const encryptedpassword = this.crypto.pbkdf2Sync(password, salt, 310000, 32, 'sha256') 
      const existingUser = await this.usersService.queryByUsername(username)
      
      if (existingUser) {
        res.status(302).send('User already exists');
        return;
      }

      this.usersService.createUser(firstName, lastName, username, encryptedpassword, salt)
      res.send('Signed up');
  }
  
  logout = (req, res) => {
    req.logout((err) => {
      if(err) return req.status(500).send('Could not logout')
    })
    res.redirect('/')
  };

  
  //Authentication middleware

  checkIfAuthorized = (req, res, next) => {
    if(req.  user == null) {
      res.status(401).send('Not authorized');
      return;
    }
    if(req.user.role == 'Admin' || req.user.role == 'User')
      next();
  }
  
  canSeeUserDetails = (req, res, next) => {
    if(req.user != null) {
      if(req.user.role === 'Admin' || req.user.id == req.params.userId) {
        console.log(`You are viewing this page as: ${req.user.role}`)
        return next()
      }
    }
    console.log('You are not allowed to view this user')
    res.redirect('/auth')
  }

  //Services
  getUserByName = async (username) => {
    const users = await this.usersService.queryByUsername(username);
    return users;
  }

}

module.exports = new Authentication(
  require('passport'), 
  require('crypto'),
  require('../services/usersService.js')
)