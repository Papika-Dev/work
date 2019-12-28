
module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.createTable('Sessions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      ip: {
        type: Sequelize.CIDR,
      },
      os: {
        type: Sequelize.TEXT,
      },
      browser: {
        type: Sequelize.TEXT,
      },
      refreshToken: {
        type: Sequelize.TEXT,
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Sessions'),
};
