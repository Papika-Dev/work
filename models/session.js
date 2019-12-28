module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define('Session', {
    name: DataTypes.STRING,
    ip: DataTypes.CIDR,
    os: DataTypes.TEXT,
    browser: DataTypes.TEXT,
    refreshToken: DataTypes.TEXT,
  }, {});
  Session.associate = (models) => {
    Session.belongsTo(models.User);
  };
  return Session;
};
