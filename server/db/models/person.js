'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Person extends Model {
    static associate (models) {
      Person.belongsTo(models.Country, {
        foreignKey: 'countryId',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
      Person.hasOne(models.Actor, {
        foreignKey: 'personId',
      });
      Person.hasOne(models.Director, {
        foreignKey: 'personId',
      });
    }
  }
  Person.init(
    {
      firstName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          len: {
            args: [2, Infinity],
            msg: 'First name must be at least 2 characters long',
          },
        },
      },
      lastName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          len: {
            args: [2, Infinity],
            msg: 'Last name must be at least 2 characters long',
          },
        },
      },
      birthDate: {
        type: DataTypes.DATEONLY,
        validate: {
          isDate: {
            msg: 'Birth date must be a valid date',
          },
          isBeforeToday (value) {
            if (value && new Date(value) > new Date()) {
              throw new Error('Birth date cannot be in the future');
            }
          },
        },
      },
      photo: {
        type: DataTypes.TEXT,
        validate: {
          isUrl: {
            msg: 'Photo must be a valid URL',
          },
        },
      },
      biography: DataTypes.STRING(2000),
    },
    {
      sequelize,
      modelName: 'Person',
      tableName: 'persons',
      underscored: true,
    }
  );
  return Person;
};
