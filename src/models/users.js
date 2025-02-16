module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Users', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    encryptedpassword: {
      type: DataTypes.BLOB,
      allowNull: false
    },
    salt: {
      type: DataTypes.BLOB,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "User"
    } 
  }, 
  {
    timestamps: false
  })
} 