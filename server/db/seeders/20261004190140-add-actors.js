'use strict';

const { getPersonId } = require('../../utils/dbHelpers');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date().toISOString();

    await queryInterface.bulkInsert(
      'actors',
      [
        {
          person_id: await getPersonId(
            queryInterface,
            Sequelize,
            'Matthew',
            'McConaughey'
          ),
          created_at: now,
          updated_at: now,
        },
        {
          person_id: await getPersonId(
            queryInterface,
            Sequelize,
            'Anne',
            'Hathaway'
          ),
          created_at: now,
          updated_at: now,
        },
        {
          person_id: await getPersonId(
            queryInterface,
            Sequelize,
            'Jessica',
            'Chastain'
          ),
          created_at: now,
          updated_at: now,
        },
        {
          person_id: await getPersonId(
            queryInterface,
            Sequelize,
            'Joaquin',
            'Phoenix'
          ),
          created_at: now,
          updated_at: now,
        },
        {
          person_id: await getPersonId(
            queryInterface,
            Sequelize,
            'Cillian',
            'Murphy'
          ),
          created_at: now,
          updated_at: now,
        },
        {
          person_id: await getPersonId(
            queryInterface,
            Sequelize,
            'Emily',
            'Blunt'
          ),
          created_at: now,
          updated_at: now,
        },
        {
          person_id: await getPersonId(
            queryInterface,
            Sequelize,
            'Keanu',
            'Reeves'
          ),
          created_at: now,
          updated_at: now,
        },
        {
          person_id: await getPersonId(
            queryInterface,
            Sequelize,
            'Laurence',
            'Fishburne'
          ),
          created_at: now,
          updated_at: now,
        },
        {
          person_id: await getPersonId(
            queryInterface,
            Sequelize,
            'Leonardo',
            'DiCaprio'
          ),
          created_at: now,
          updated_at: now,
        },
        {
          person_id: await getPersonId(
            queryInterface,
            Sequelize,
            'Joseph',
            'Gordon-Levitt'
          ),
          created_at: now,
          updated_at: now,
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('actors', null, {});
  },
};
