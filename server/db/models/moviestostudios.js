'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MoviesToStudios extends Model {
    static associate (models) {
      MoviesToStudios.belongsTo(models.Studio, {
        foreignKey: {
          name: 'studioId',
          allowNull: false,
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      MoviesToStudios.belongsTo(models.Movie, {
        foreignKey: {
          name: 'movieId',
          allowNull: false,
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  MoviesToStudios.init(
    {},
    {
      sequelize,
      modelName: 'MoviesToStudios',
      underscored: true,
    }
  );
  return MoviesToStudios;
};
