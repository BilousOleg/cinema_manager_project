'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('genres', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      genre_name: {
        type: Sequelize.STRING(50),
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

    await queryInterface.addConstraint('genres', {
      fields: ['genre_name'],
      type: 'check',
      name: 'genres_genre_name_check',
      where: Sequelize.literal('LENGTH(genre_name) >= 2'),
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('genres');
  },
};
