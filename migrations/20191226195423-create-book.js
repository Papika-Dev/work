
module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.createTable('Books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      author: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      cover: {
        type: Sequelize.TEXT,
      },
      price: {
        type: Sequelize.REAL,
      },
      rating: {
        type: Sequelize.REAL,
      },
      category: {
        type: Sequelize.STRING,
      },
      sale: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    })
  ),
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Books'),
};
