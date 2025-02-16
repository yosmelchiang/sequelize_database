class Users {
  constructor(usersService) {
    this.usersService = usersService
  }
  
  showUserDetails = async (req, res) => {
    const user = await this.usersService.queryById(req.params.userId);
    // console.log(user)
    res.render('users/userDetails', { user: user } )
  }
}

module.exports = new Users(require('../services/usersService.js'))