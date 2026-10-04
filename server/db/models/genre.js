'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Genre extends Model {
    static associate (models) {
      Genre.belongsToMany(models.Movie, {
        through: models.MoviesToGenres,
        foreignKey: 'genreId',
      });
    }
  }
  Genre.init(
    {
      genreName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          len: {
            args: [2, Infinity],
            msg: 'Genre name must be at least 2 characters long',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Genre',
      underscored: true,
    }
  );
  return Genre;
};
