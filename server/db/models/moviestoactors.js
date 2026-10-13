'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MoviesToActors extends Model {
    static associate (models) {
      MoviesToActors.belongsTo(models.Actor, {
        foreignKey: {
          name: 'actorId',
          allowNull: false,
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      MoviesToActors.belongsTo(models.Movie, {
        foreignKey: {
          name: 'movieId',
          allowNull: false,
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  MoviesToActors.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'MoviesToActors',
      underscored: true,
    }
  );
  return MoviesToActors;
};
