'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date().toISOString();

    await queryInterface.bulkInsert(
      'movies',
      [
        {
          title: 'Interstellar',
          year: 2014,
          poster:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN6MBU9VxzNxqU0gzzOsgDR0Mpxn4_6BDHIzD-Xc8YaQ&s=10',
          trailer: 'https://www.youtube.com/watch?v=zSWdZVtXT7E',
          description:
            'A team of astronauts travels through a wormhole in search of a new home for humanity.',
          created_at: now,
          updated_at: now,
        },
        {
          title: 'Joker',
          year: 2019,
          poster:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPOXFFZpg7J8ka6L6mvKWbczd0RSi6cewOp5cssjDsAg&s',
          trailer: 'https://www.youtube.com/watch?v=zAGVQLHvwOY',
          description:
            'Arthur Fleck slowly descends into madness and becomes the Joker.',
          created_at: now,
          updated_at: now,
        },
        {
          title: 'Oppenheimer',
          year: 2023,
          poster:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3gsJAEwsM9Y3lIK2f6M24jtsae8ljoF2kFvC03Qn7Tw&s',
          trailer: 'https://www.youtube.com/watch?v=uYPbbksJxIg',
          description:
            'The story of physicist J. Robert Oppenheimer and the Manhattan Project.',
          created_at: now,
          updated_at: now,
        },
        {
          title: 'The Matrix',
          year: 1999,
          poster:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReiSWTPdu0wOgC67hH3Ftm4o7Ckgm9OH1xWHbBb1zLCw&s=10',
          trailer: 'https://www.youtube.com/watch?v=vKQi3bBA1y8',
          description:
            'A hacker discovers that reality is a computer simulation.',
          created_at: now,
          updated_at: now,
        },
        {
          title: 'Inception',
          year: 2010,
          poster:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbY-KG6to1c6TnWtwLvFbPva_pqcffh7UlWiOCjmUFuA&s=10',
          trailer: 'https://www.youtube.com/watch?v=YoHD9XEInc0',
          description: "A thief enters people's dreams to steal secrets.",
          created_at: now,
          updated_at: now,
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('movies', null, {});
  },
};
