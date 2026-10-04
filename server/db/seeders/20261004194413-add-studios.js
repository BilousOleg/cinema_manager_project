'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date().toISOString();

    const [USA] = await queryInterface.sequelize.query(
      `SELECT id FROM countries WHERE country_name = 'USA'`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    const [australia] = await queryInterface.sequelize.query(
      `SELECT id FROM countries WHERE country_name = 'Australia'`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    await queryInterface.bulkInsert(
      'studios',
      [
        {
          studio_name: 'Warner Bros. Pictures',
          founded: 1923,
          country_id: USA.id,
          logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKjUsWV5bfTnNebkW8x-TWwAQK7dNtRlhzOe6_021VSQ&s=10',
          description: '',
          created_at: now,
          updated_at: now,
        },
        {
          studio_name: 'DC Films',
          founded: 2016,
          country_id: USA.id,
          logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPkOI-5VPQTphP8ywCHIE7HiT1gzDtz-SjNZrHyDhR8A&s',
          description: '',
          created_at: now,
          updated_at: now,
        },
        {
          studio_name: 'Universal Pictures',
          founded: 1912,
          country_id: USA.id,
          logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCDjUYCMWCJvYgNi5GPXrAo-iX3n5VnbG7vIEZFwSl3Q&s',
          description: '',
          created_at: now,
          updated_at: now,
        },
        {
          studio_name: 'Village Roadshow Pictures',
          founded: 1986,
          country_id: australia.id,
          logo: 'https://i0.wp.com/www.thewrap.com/wp-content/uploads/2017/04/village-roadshow-logo.jpg?fit=618%2C412&quality=89&ssl=1',
          description: '',
          created_at: now,
          updated_at: now,
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('studios', null, {});
  },
};
