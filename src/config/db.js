require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

//Creates a new instance of Sequelize, stored in db
const db = new Sequelize({
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dialect: process.env.DB_DIALECT,
  logging: false //We can disable logging to get rid of a bunch of stuff
  // logging: (log) => console.log(`SQL: ${log}`)
});

//Models
//Initializing models by passing the sequelize instance and datatypes to it (this is currying)
const Species = require('../models/species.js')(db, DataTypes);
const Animals = require('../models/animals.js')(db, DataTypes);
const Users = require('../models/users.js')(db, DataTypes);

//Assoctiations
//1-m
Animals.belongsTo(Species); //The many side - Animals has the FK
Species.hasMany(Animals); //The One side, - Animals has the FK

Animals.belongsTo(Users)
Users.hasMany(Animals)

//Testing authentication and synchronizing models
db.init = async () => {
  try {
    await db.authenticate();
    console.log('Database connection established');
  } catch (err) {
    console.error(`DB: Could not establish a connection: ${err}`);
  }

  try {
    await db.sync({ force: false }); // 'alter' modifies the tables as needed
    console.log('Database synchronized successfully');
  } catch (err) {
    console.error('Error synchronizing database:', err);
  }
}

module.exports = db
