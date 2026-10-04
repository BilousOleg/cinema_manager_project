'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    static associate (models) {
      Movie.belongsToMany(models.Actor, {
        through: models.MoviesToActors,
        foreignKey: 'movieId',
      });
      Movie.belongsToMany(models.Director, {
        through: models.MoviesToDirectors,
        foreignKey: 'movieId',
      });
      Movie.belongsToMany(models.Studio, {
        through: models.MoviesToStudios,
        foreignKey: 'movieId',
      });
      Movie.belongsToMany(models.Genre, {
        through: models.MoviesToGenres,
        foreignKey: 'movieId',
      });
    }
  }
  Movie.init(
    {
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          len: {
            args: [2, Infinity],
            msg: 'Title must be at least 2 characters long',
          },
        },
      },
      year: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        validate: {
          min: 1800,
          isNotFutureYear (value) {
            const currentYear = new Date().getFullYear();

            if (value > currentYear) {
              throw new Error(
                `Release year cannot be later than ${currentYear}`
              );
            }
          },
        },
      },
      poster: {
        type: DataTypes.TEXT,
        validate: {
          isUrl: {
            msg: 'Poster must be a valid URL',
          },
        },
      },
      trailer: {
        type: DataTypes.TEXT,
        validate: {
          isUrl: {
            msg: 'Trailer must be a valid URL',
          },
        },
      },
      description: {
        type: DataTypes.STRING(2000),
      },
    },
    {
      sequelize,
      modelName: 'Movie',
      underscored: true,
    }
  );
  return Movie;
};
