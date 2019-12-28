module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    text: DataTypes.TEXT,
    isRead: DataTypes.BOOLEAN,
    authorName: DataTypes.STRING,
    rating: DataTypes.INTEGER,
  }, {});
  Comment.associate = (models) => {
    // associations can be defined here
    Comment.belongsTo(models.Book);
  };
  return Comment;
};
