'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MoviesToGenres extends Model {
    static associate (models) {
      MoviesToGenres.belongsTo(models.Genre, {
        foreignKey: {
          name: 'genreId',
          allowNull: false,
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      MoviesToGenres.belongsTo(models.Movie, {
        foreignKey: {
          name: 'movieId',
          allowNull: false,
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  MoviesToGenres.init(
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
      modelName: 'MoviesToGenres',
      underscored: true,
    }
  );
  return MoviesToGenres;
};
