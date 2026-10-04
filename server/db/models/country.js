'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Country extends Model {
    static associate (models) {
      Country.hasMany(models.Person, {
        foreignKey: 'countryId',
      });
      Country.hasMany(models.Studio, {
        foreignKey: 'countryId',
      });
    }
  }
  Country.init(
    {
      countryName: {
        type: DataTypes.STRING(64),
        allowNull: false,
        validate: {
          len: {
            args: [2, Infinity],
            msg: 'Country name must be at least 2 characters long',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Country',
      underscored: true,
    }
  );
  return Country;
};
