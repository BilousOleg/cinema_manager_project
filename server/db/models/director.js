'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Director extends Model {
    static associate (models) {
      Director.belongsTo(models.Person, {
        foreignKey: {
          name: 'personId',
          allowNull: false,
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      Director.belongsToMany(models.Movie, {
        through: models.MoviesToDirectors,
        foreignKey: 'directorId',
      });
    }
  }
  Director.init(
    {},
    {
      sequelize,
      modelName: 'Director',
      underscored: true,
    }
  );
  return Director;
};
