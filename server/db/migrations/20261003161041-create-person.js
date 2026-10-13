'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('persons', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
      },
      first_name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      birth_date: {
        type: Sequelize.DATEONLY,
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
      photo: {
        type: Sequelize.TEXT,
      },
      biography: {
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

    await queryInterface.addConstraint('persons', {
      fields: ['first_name'],
      type: 'check',
      name: 'persons_first_name_check',
      where: Sequelize.literal('LENGTH(first_name) >= 2'),
    });

    await queryInterface.addConstraint('persons', {
      fields: ['last_name'],
      type: 'check',
      name: 'persons_last_name_check',
      where: Sequelize.literal('LENGTH(last_name) >= 2'),
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('persons');
  },
};
