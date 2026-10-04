'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('movies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      year: {
        type: Sequelize.SMALLINT,
        allowNull: false,
      },
      poster: {
        type: Sequelize.TEXT,
      },
      trailer: {
        type: Sequelize.TEXT,
      },
      description: {
        type: Sequelize.STRING(2000),
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

    await queryInterface.addConstraint('movies', {
      fields: ['title'],
      type: 'check',
      name: 'movies_title_check',
      where: Sequelize.literal('LENGTH(title) >= 1'),
    });

    await queryInterface.addConstraint('movies', {
      fields: ['year'],
      type: 'check',
      name: 'movies_year_check',
      where: Sequelize.literal('year >= 1800'),
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('movies');
  },
};
