module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Species', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, 
  {
    timestamps: false
  })
} 