'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MoviesToDirectors extends Model {
    static associate (models) {
      MoviesToDirectors.belongsTo(models.Director, {
        foreignKey: {
          name: 'directorId',
          allowNull: false,
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      MoviesToDirectors.belongsTo(models.Movie, {
        foreignKey: {
          name: 'movieId',
          allowNull: false,
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  MoviesToDirectors.init(
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
      modelName: 'MoviesToDirectors',
      underscored: true,
    }
  );
  return MoviesToDirectors;
};
