'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Actor extends Model {
    static associate (models) {
      Actor.belongsTo(models.Person, {
        foreignKey: {
          name: 'personId',
          allowNull: false,
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      Actor.belongsToMany(models.Movie, {
        through: models.MoviesToActors,
        foreignKey: 'actorId',
      });
    }
  }
  Actor.init(
    {},
    {
      sequelize,
      modelName: 'Actor',
      underscored: true,
    }
  );
  return Actor;
};
