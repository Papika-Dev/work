
// eslint-disable-next-line no-unused-vars
module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {}, {});
  Favorite.associate = (models) => {
    Favorite.belongsTo(models.Book);
    Favorite.belongsTo(models.User);
  };
  return Favorite;
};
