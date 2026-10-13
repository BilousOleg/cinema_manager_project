'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('studios', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
      },
      studio_name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      founded: {
        type: Sequelize.SMALLINT,
      },
      country_id: {
        type: Sequelize.UUID,
        references: {
          model: 'countries',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      logo: {
        type: Sequelize.TEXT,
      },
      description: {
        type: Sequelize.STRING(2000),
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.addConstraint('studios', {
      fields: ['studio_name'],
      type: 'check',
      name: 'studios_studio_name_check',
      where: Sequelize.literal('LENGTH(studio_name) >= 2'),
    });

    await queryInterface.addConstraint('studios', {
      fields: ['founded'],
      type: 'check',
      name: 'studios_founded_check',
      where: Sequelize.literal('founded >= 1800'),
    });

    await queryInterface.addConstraint('studios', {
      fields: ['studio_name'],
      type: 'unique',
      name: 'studios_studio_name_unique',
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('studios');
  },
};
