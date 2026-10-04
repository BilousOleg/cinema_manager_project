'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date().toISOString();

    await queryInterface.bulkInsert(
      'genres',
      [
        {
          genre_name: 'Action',
          created_at: now,
          updated_at: now,
        },
        {
          genre_name: 'Adventure',
          created_at: now,
          updated_at: now,
        },
        {
          genre_name: 'Biography',
          created_at: now,
          updated_at: now,
        },
        {
          genre_name: 'Comedy',
          created_at: now,
          updated_at: now,
        },
        {
          genre_name: 'Crime',
          created_at: now,
          updated_at: now,
        },
        {
          genre_name: 'Drama',
          created_at: now,
          updated_at: now,
        },
        {
          genre_name: 'Fantasy',
          created_at: now,
          updated_at: now,
        },
        {
          genre_name: 'Horror',
          created_at: now,
          updated_at: now,
        },
        {
          genre_name: 'Romance',
          created_at: now,
          updated_at: now,
        },
        {
          genre_name: 'Science Fiction',
          created_at: now,
          updated_at: now,
        },
        {
          genre_name: 'Thriller',
          created_at: now,
          updated_at: now,
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('genres', null, {});
  },
};
