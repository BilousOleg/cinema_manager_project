'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('movies_to_directors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      director_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'directors',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      movie_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'movies',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
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

    await queryInterface.addConstraint('movies_to_directors', {
      fields: ['director_id', 'movie_id'],
      type: 'unique',
      name: 'movies_to_directors_director_id_movie_id_unique',
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('movies_to_directors');
  },
};
