module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    mail: DataTypes.STRING,
    password: DataTypes.TEXT,
    avatar: DataTypes.TEXT,
    phone: DataTypes.TEXT,
  }, {});
  User.associate = (models) => {
    User.hasMany(models.Book);
  };
  return User;
};
