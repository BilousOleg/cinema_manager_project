'use strict';

const { getMovieId, getPersonId } = require('../../utils/dbHelpers');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date().toISOString();

    const getActorId = async (firstName, lastName) => {
      const personId = await getPersonId(
        queryInterface,
        Sequelize,
        firstName,
        lastName
      );
      const [actor] = await queryInterface.sequelize.query(
        ` SELECT id FROM actors WHERE person_id = '${personId}'`,
        { type: Sequelize.QueryTypes.SELECT }
      );
      return actor.id;
    };

    const matthew = await getActorId('Matthew', 'McConaughey');
    const anne = await getActorId('Anne', 'Hathaway');
    const jessica = await getActorId('Jessica', 'Chastain');
    const joaquin = await getActorId('Joaquin', 'Phoenix');
    const cillian = await getActorId('Cillian', 'Murphy');
    const emily = await getActorId('Emily', 'Blunt');
    const keanu = await getActorId('Keanu', 'Reeves');
    const laurence = await getActorId('Laurence', 'Fishburne');
    const leonardo = await getActorId('Leonardo', 'DiCaprio');
    const joseph = await getActorId('Joseph', 'Gordon-Levitt');

    await queryInterface.bulkInsert(
      'movies_to_actors',
      [
        {
          actor_id: matthew,
          movie_id: await getMovieId(queryInterface, Sequelize, 'Interstellar'),
          character_name: 'Cooper',
          created_at: now,
          updated_at: now,
        },
        {
          actor_id: anne,
          movie_id: await getMovieId(queryInterface, Sequelize, 'Interstellar'),
          character_name: 'Amelia Brand',
          created_at: now,
          updated_at: now,
        },
        {
          actor_id: jessica,
          movie_id: await getMovieId(queryInterface, Sequelize, 'Interstellar'),
          character_name: 'Murphy',
          created_at: now,
          updated_at: now,
        },
        {
          actor_id: joaquin,
          movie_id: await getMovieId(queryInterface, Sequelize, 'Joker'),
          character_name: 'Arthur Fleck',
          created_at: now,
          updated_at: now,
        },
        {
          actor_id: cillian,
          movie_id: await getMovieId(queryInterface, Sequelize, 'Oppenheimer'),
          character_name: 'J. Robert Oppenheimer',
          created_at: now,
          updated_at: now,
        },
        {
          actor_id: emily,
          movie_id: await getMovieId(queryInterface, Sequelize, 'Oppenheimer'),
          character_name: 'Kitty Oppenheimer',
          created_at: now,
          updated_at: now,
        },
        {
          actor_id: keanu,
          movie_id: await getMovieId(queryInterface, Sequelize, 'The Matrix'),
          character_name: 'Neo',
          created_at: now,
          updated_at: now,
        },
        {
          actor_id: laurence,
          movie_id: await getMovieId(queryInterface, Sequelize, 'The Matrix'),
          character_name: 'Morpheus',
          created_at: now,
          updated_at: now,
        },
        {
          actor_id: leonardo,
          movie_id: await getMovieId(queryInterface, Sequelize, 'Inception'),
          character_name: 'Cobb',
          created_at: now,
          updated_at: now,
        },
        {
          actor_id: joseph,
          movie_id: await getMovieId(queryInterface, Sequelize, 'Inception'),
          character_name: 'Arthur',
          created_at: now,
          updated_at: now,
        },
      ],
      {}
    );
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('movies_to_actors', null, {});
  },
};
