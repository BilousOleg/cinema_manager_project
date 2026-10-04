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
      characterName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          len: {
            args: [2, Infinity],
            msg: 'Character name must be at least 2 characters long',
          },
        },
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
