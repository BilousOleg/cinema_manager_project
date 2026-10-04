'use strict';

const { getMovieId } = require('../../utils/dbHelpers');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date().toISOString();

    const getStudioId = async name => {
      const [studio] = await queryInterface.sequelize.query(
        `SELECT id FROM studios WHERE studio_name = '${name}'`,
        { type: Sequelize.QueryTypes.SELECT }
      );
      return studio.id;
    };

    const warnerBrosPictures = await getStudioId('Warner Bros. Pictures');
    const DCFilms = await getStudioId('DC Films');
    const universalPictures = await getStudioId('Universal Pictures');
    const villageRoadshowPictures = await getStudioId(
      'Village Roadshow Pictures'
    );

    await queryInterface.bulkInsert(
      'movies_to_studios',
      [
        {
          studio_id: warnerBrosPictures,
          movie_id: await getMovieId(queryInterface, Sequelize, 'Interstellar'),
          created_at: now,
          updated_at: now,
        },
        {
          studio_id: warnerBrosPictures,
          movie_id: await getMovieId(queryInterface, Sequelize, 'Joker'),
          created_at: now,
          updated_at: now,
        },
        {
          studio_id: DCFilms,
          movie_id: await getMovieId(queryInterface, Sequelize, 'Joker'),
          created_at: now,
          updated_at: now,
        },
        {
          studio_id: universalPictures,
          movie_id: await getMovieId(queryInterface, Sequelize, 'Oppenheimer'),
          created_at: now,
          updated_at: now,
        },
        {
          studio_id: warnerBrosPictures,
          movie_id: await getMovieId(queryInterface, Sequelize, 'The Matrix'),
          created_at: now,
          updated_at: now,
        },
        {
          studio_id: villageRoadshowPictures,
          movie_id: await getMovieId(queryInterface, Sequelize, 'The Matrix'),
          created_at: now,
          updated_at: now,
        },
        {
          studio_id: warnerBrosPictures,
          movie_id: await getMovieId(queryInterface, Sequelize, 'Inception'),
          created_at: now,
          updated_at: now,
        },
      ],
      {}
    );
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('movies_to_studios', null, {});
  },
};
