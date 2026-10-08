'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date().toISOString();

    const { QueryTypes } = Sequelize;

    const [USA] = await queryInterface.sequelize.query(
      `SELECT id FROM countries WHERE country_name = 'USA'`,
      { type: QueryTypes.SELECT }
    );
    const [ireland] = await queryInterface.sequelize.query(
      `SELECT id FROM countries WHERE country_name = 'Ireland'`,
      { type: QueryTypes.SELECT }
    );
    const [unitedKingdom] = await queryInterface.sequelize.query(
      `SELECT id FROM countries WHERE country_name = 'United Kingdom'`,
      { type: QueryTypes.SELECT }
    );
    const [canada] = await queryInterface.sequelize.query(
      `SELECT id FROM countries WHERE country_name = 'Canada'`,
      { type: QueryTypes.SELECT }
    );

    await queryInterface.bulkInsert(
      'persons',
      [
        {
          first_name: 'Matthew',
          last_name: 'McConaughey',
          birth_date: '1969-11-04',
          country_id: USA.id,
          photo:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqfu-8n0ljUW4HAw5VtBpUkxB09VQ3SjoG4i3rDdk1WQsCfl8PMftbeakmk-hrYbDyA9YrFQ5lm7s0QVxg_VxAk9mvx9HXA_7iXsMqFww&s=10',
          biography: 'Academy Award-winning American actor.',
          created_at: now,
          updated_at: now,
        },
        {
          first_name: 'Anne',
          last_name: 'Hathaway',
          birth_date: '1982-11-12',
          country_id: USA.id,
          photo:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Anne_Hathaway-_Press_conference_for_the_film_%22The_Devil_Wears_Prada_2%22_-_55194764955_%28cropped%29.jpg/960px-Anne_Hathaway-_Press_conference_for_the_film_%22The_Devil_Wears_Prada_2%22_-_55194764955_%28cropped%29.jpg',
          biography: 'American actress and Academy Award winner.',
          created_at: now,
          updated_at: now,
        },
        {
          first_name: 'Jessica',
          last_name: 'Chastain',
          birth_date: '1977-03-24',
          country_id: USA.id,
          photo:
            'https://upload.wikimedia.org/wikipedia/commons/1/11/Jessica_Chastain-64631_%28cropped%29.jpg',
          biography: 'American actress and producer.',
          created_at: now,
          updated_at: now,
        },
        {
          first_name: 'Joaquin',
          last_name: 'Phoenix',
          birth_date: '1974-10-28',
          country_id: USA.id,
          photo:
            'https://upload.wikimedia.org/wikipedia/commons/d/dc/Joaquin_Phoenix-64908_%28cropped%29.jpg',
          biography: 'American actor known for intense dramatic roles.',
          created_at: now,
          updated_at: now,
        },
        {
          first_name: 'Cillian',
          last_name: 'Murphy',
          birth_date: '1976-05-25',
          country_id: ireland.id,
          photo:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Cillian_Murphy-2014.jpg/250px-Cillian_Murphy-2014.jpg',
          biography: 'Academy Award-winning American actor.',
          created_at: now,
          updated_at: now,
        },
        {
          first_name: 'Emily',
          last_name: 'Blunt',
          birth_date: '1983-02-23',
          country_id: unitedKingdom.id,
          photo:
            'https://upload.wikimedia.org/wikipedia/commons/4/45/Emily_Blunt_at_WWD_Style_Awards_2026-02.jpg',
          biography: 'British actress.',
          created_at: now,
          updated_at: now,
        },
        {
          first_name: 'Keanu',
          last_name: 'Reeves',
          birth_date: '1964-09-02',
          country_id: canada.id,
          photo:
            'https://upload.wikimedia.org/wikipedia/commons/b/b4/Keanu_Reeves_at_TIFF_2025_02_%28Cropped%29.jpg',
          biography: 'Canadian actor best known for The Matrix and John Wick.',
          created_at: now,
          updated_at: now,
        },
        {
          first_name: 'Laurence',
          last_name: 'Fishburne',
          birth_date: '1961-07-30',
          country_id: USA.id,
          photo:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Laurence_Fishburne_at_53rd_Saturn_Awards_2026.jpg/960px-Laurence_Fishburne_at_53rd_Saturn_Awards_2026.jpg',
          biography: 'American actor and producer.',
          created_at: now,
          updated_at: now,
        },
        {
          first_name: 'Leonardo',
          last_name: 'DiCaprio',
          birth_date: '1974-11-11',
          country_id: USA.id,
          photo:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/LeoPTABFI191125-28_%28cropped%29.jpg/250px-LeoPTABFI191125-28_%28cropped%29.jpg',
          biography: 'Academy Award-winning American actor and producer.',
          created_at: now,
          updated_at: now,
        },
        {
          first_name: 'Joseph',
          last_name: 'Gordon-Levitt',
          birth_date: '1981-02-17',
          country_id: USA.id,
          photo:
            'https://upload.wikimedia.org/wikipedia/commons/0/01/Joseph_Gordon_Levitt_Sundance_Film_Festival_2026_%28cropped%29.jpg',
          biography: 'American actor and filmmaker.',
          created_at: now,
          updated_at: now,
        },
        {
          first_name: 'Christopher',
          last_name: 'Nolan',
          birth_date: '1970-07-30',
          country_id: unitedKingdom.id,
          photo:
            'https://upload.wikimedia.org/wikipedia/commons/9/95/Christopher_Nolan_Cannes_2018.jpg',
          biography:
            'British-American film director, producer and screenwriter. Known for large-scale science fiction and psychological thrillers.',
          created_at: now,
          updated_at: now,
        },
        {
          first_name: 'Todd',
          last_name: 'Phillips',
          birth_date: '1970-12-20',
          country_id: USA.id,
          photo:
            'https://upload.wikimedia.org/wikipedia/commons/0/0b/Todd_Phillips-64847.jpg',
          biography:
            'American film director, producer and screenwriter. Best known for Joker and The Hangover trilogy.',
          created_at: now,
          updated_at: now,
        },
        {
          first_name: 'Lana',
          last_name: 'Wachowski',
          birth_date: '1965-06-21',
          country_id: USA.id,
          photo:
            'https://upload.wikimedia.org/wikipedia/commons/5/55/Lana_Wachowski-2787_%283x4_cropped%29.jpg',
          biography:
            'American filmmaker best known for co-creating The Matrix franchise.',
          created_at: now,
          updated_at: now,
        },
        {
          first_name: 'Lilly',
          last_name: 'Wachowski',
          birth_date: '1967-12-29',
          country_id: USA.id,
          photo:
            'https://upload.wikimedia.org/wikipedia/commons/d/de/Lily_Wachowski%2C_London%2C_2018_by_Christa_Holka.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original',
          biography:
            'American filmmaker best known for co-creating The Matrix franchise.',
          created_at: now,
          updated_at: now,
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('persons', null, {});
  },
};
