'use strict';

const { getMovieId } = require('../../utils/dbHelpers');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date().toISOString();

    const getGenreId = async name => {
      const [genre] = await queryInterface.sequelize.query(
        `SELECT id FROM genres WHERE genre_name = '${name}'`,
        { type: Sequelize.QueryTypes.SELECT }
      );

      return genre.id;
    };

    const action = await getGenreId('Action');
    const adventure = await getGenreId('Adventure');
    const biography = await getGenreId('Biography');
    const crime = await getGenreId('Crime');
    const drama = await getGenreId('Drama');
    const scienceFiction = await getGenreId('Science Fiction');
    const thriller = await getGenreId('Thriller');

    await queryInterface.bulkInsert(
      'movies_to_genres',
      [
        {
          genre_id: adventure,
          movie_id: await getMovieId(queryInterface, Sequelize, 'Interstellar'),
          created_at: now,
          updated_at: now,
        },
        {
          genre_id: drama,
          movie_id: await getMovieId(queryInterface, Sequelize, 'Interstellar'),
          created_at: now,
          updated_at: now,
        },
        {
          genre_id: scienceFiction,
          movie_id: await getMovieId(queryInterface, Sequelize, 'Interstellar'),
          created_at: now,
          updated_at: now,
        },
        {
          genre_id: crime,
          movie_id: await getMovieId(queryInterface, Sequelize, 'Joker'),
          created_at: now,
          updated_at: now,
        },
        {
          genre_id: drama,
          movie_id: await getMovieId(queryInterface, Sequelize, 'Joker'),
          created_at: now,
          updated_at: now,
        },
        {
          genre_id: thriller,
          movie_id: await getMovieId(queryInterface, Sequelize, 'Joker'),
          created_at: now,
          updated_at: now,
        },
        {
          genre_id: biography,
          movie_id: await getMovieId(queryInterface, Sequelize, 'Oppenheimer'),
          created_at: now,
          updated_at: now,
        },
        {
          genre_id: drama,
          movie_id: await getMovieId(queryInterface, Sequelize, 'Oppenheimer'),
          created_at: now,
          updated_at: now,
        },
        {
          genre_id: action,
          movie_id: await getMovieId(queryInterface, Sequelize, 'The Matrix'),
          created_at: now,
          updated_at: now,
        },
        {
          genre_id: scienceFiction,
          movie_id: await getMovieId(queryInterface, Sequelize, 'The Matrix'),
          created_at: now,
          updated_at: now,
        },
        {
          genre_id: action,
          movie_id: await getMovieId(queryInterface, Sequelize, 'Inception'),
          created_at: now,
          updated_at: now,
        },
        {
          genre_id: scienceFiction,
          movie_id: await getMovieId(queryInterface, Sequelize, 'Inception'),
          created_at: now,
          updated_at: now,
        },
        {
          genre_id: thriller,
          movie_id: await getMovieId(queryInterface, Sequelize, 'Inception'),
          created_at: now,
          updated_at: now,
        },
      ],
      {}
    );
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('movies_to_genres', null, {});
  },
};
