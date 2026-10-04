'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date().toISOString();

    await queryInterface.bulkInsert(
      'countries',
      [
        {
          country_name: 'USA',
          created_at: now,
          updated_at: now,
        },
        {
          country_name: 'Ireland',
          created_at: now,
          updated_at: now,
        },
        {
          country_name: 'United Kingdom',
          created_at: now,
          updated_at: now,
        },
        {
          country_name: 'Canada',
          created_at: now,
          updated_at: now,
        },
        {
          country_name: 'Australia',
          created_at: now,
          updated_at: now,
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('countries', null, {});
  },
};
