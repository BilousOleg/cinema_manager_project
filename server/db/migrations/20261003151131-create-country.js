'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('countries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      country_name: {
        type: Sequelize.STRING(64),
        allowNull: false,
        unique: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.addConstraint('countries', {
      fields: ['country_name'],
      type: 'check',
      name: 'countries_country_name_check',
      where: Sequelize.literal('LENGTH(country_name) >= 2'),
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('countries');
  },
};
