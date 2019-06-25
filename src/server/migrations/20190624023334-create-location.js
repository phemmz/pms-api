'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Locations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Location name can not be empty',
          },
        }
      },
      female: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      male: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      parentLocationId: {
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        references: {
          model: 'Locations',
          key: 'id',
        },
      }
    });
  },
  down: (queryInterface, _) => {
    return queryInterface.dropTable('Locations');
  }
};