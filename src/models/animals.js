module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Animals', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
)
}