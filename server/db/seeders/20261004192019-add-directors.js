'use strict';

const { getPersonId } = require('../../utils/dbHelpers');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date().toISOString();

    await queryInterface.bulkInsert(
      'directors',
      [
        {
          person_id: await getPersonId(
            queryInterface,
            Sequelize,
            'Christopher',
            'Nolan'
          ),
          created_at: now,
          updated_at: now,
        },
        {
          person_id: await getPersonId(
            queryInterface,
            Sequelize,
            'Todd',
            'Phillips'
          ),
          created_at: now,
          updated_at: now,
        },
        {
          person_id: await getPersonId(
            queryInterface,
            Sequelize,
            'Lana',
            'Wachowski'
          ),
          created_at: now,
          updated_at: now,
        },
        {
          person_id: await getPersonId(
            queryInterface,
            Sequelize,
            'Lilly',
            'Wachowski'
          ),
          created_at: now,
          updated_at: now,
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('directors', null, {});
  },
};
