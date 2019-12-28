module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.createTable('Favorites', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      UserId: {
        type: Sequelize.INTEGER,
      },
      BookId: {
        type: Sequelize.INTEGER,
      },
    })
  ),
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Favorites'),
};
