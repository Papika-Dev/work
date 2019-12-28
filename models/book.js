module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    description: DataTypes.TEXT,
    cover: DataTypes.TEXT,
    price: DataTypes.REAL,
    rating: DataTypes.REAL,
    category: DataTypes.STRING,
    sale: DataTypes.BOOLEAN,
  }, {});
  Book.associate = (models) => {
    Book.belongsTo(models.User);
    Book.hasMany(models.Comment);
  };
  return Book;
};
