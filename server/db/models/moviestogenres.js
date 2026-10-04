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
    {},
    {
      sequelize,
      modelName: 'MoviesToGenres',
      underscored: true,
    }
  );
  return MoviesToGenres;
};
