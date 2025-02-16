class UsersService {
  constructor(db) {
    this.Users = db.models.Users;
    this.Animals = db.models.Animals;
  }

  async queryById(userId) {
    try {
      const user = await this.Users.findByPk(userId);
      
      if(!user) {
        console.log('This user does not exist in database')
      }
      
      return JSON.parse(JSON.stringify(user));
    } catch(err) {
      console.error('Could not fetch this user', err)
    }
  }

  async queryByUsername(username) {
    try {
      const user = await this.Users.findOne({
        where: { username: username },
        include: this.Animals //We want to include the animals they own
      });

      if (!user) {
        console.log('Users table is empty, maybe add some?');
      }

      return JSON.parse(JSON.stringify(user)); //Converts sequelize object to plain JSON
    } catch (err) {
      console.error('Could not fetch user', err);
    }
  }

  async createUser(firstName, lastName, username, encryptedpassword, salt) {
    try {
      await this.Users.create({
        firstName,
        lastName,
        username,
        encryptedpassword,
        salt
      })
    } catch(err) {
      console.error('Could not create user', err)
    }
  }
}

module.exports = new UsersService(require('../config/db.js'));
