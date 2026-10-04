'use strict';

const { getPersonId, getMovieId } = require('../../utils/dbHelpers');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date().toISOString();

    const getDirectorId = async (firstName, lastName) => {
      const personId = await getPersonId(
        queryInterface,
        Sequelize,
        firstName,
        lastName
      );
      const [director] = await queryInterface.sequelize.query(
        ` SELECT id FROM directors WHERE person_id = '${personId}'`,
        { type: Sequelize.QueryTypes.SELECT }
      );
      return director.id;
    };

    const nolan = await getDirectorId('Christopher', 'Nolan');
    const phillips = await getDirectorId('Todd', 'Phillips');
    const lana = await getDirectorId('Lana', 'Wachowski');
    const lilly = await getDirectorId('Lilly', 'Wachowski');

    await queryInterface.bulkInsert(
      'movies_to_directors',
      [
        {
          director_id: nolan,
          movie_id: await getMovieId(queryInterface, Sequelize, 'Interstellar'),
          created_at: now,
          updated_at: now,
        },
        {
          director_id: phillips,
          movie_id: await getMovieId(queryInterface, Sequelize, 'Joker'),
          created_at: now,
          updated_at: now,
        },
        {
          director_id: nolan,
          movie_id: await getMovieId(queryInterface, Sequelize, 'Oppenheimer'),
          created_at: now,
          updated_at: now,
        },
        {
          director_id: lana,
          movie_id: await getMovieId(queryInterface, Sequelize, 'The Matrix'),
          created_at: now,
          updated_at: now,
        },
        {
          director_id: lilly,
          movie_id: await getMovieId(queryInterface, Sequelize, 'The Matrix'),
          created_at: now,
          updated_at: now,
        },
        {
          director_id: nolan,
          movie_id: await getMovieId(queryInterface, Sequelize, 'Inception'),
          created_at: now,
          updated_at: now,
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('movies_to_directors', null, {});
  },
};
