'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('movies_to_actors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      character_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      actor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'actors',
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

    await queryInterface.addConstraint('movies_to_actors', {
      fields: ['character_name'],
      type: 'check',
      name: 'movies_to_actors_character_name_check',
      where: Sequelize.literal('LENGTH(character_name) >= 2'),
    });

    await queryInterface.addConstraint('movies_to_actors', {
      fields: ['actor_id', 'movie_id'],
      type: 'unique',
      name: 'movies_to_actors_actor_id_movie_id_unique',
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('movies_to_actors');
  },
};
