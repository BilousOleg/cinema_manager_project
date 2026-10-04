'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Studio extends Model {
    static associate (models) {
      Studio.belongsTo(models.Country, {
        foreignKey: 'countryId',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
      Studio.belongsToMany(models.Movie, {
        through: models.MoviesToStudios,
        foreignKey: 'studioId',
      });
    }
  }
  Studio.init(
    {
      studioName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          len: {
            args: [2, Infinity],
            msg: 'Studio name must be at least 2 characters long',
          },
        },
      },
      founded: {
        type: DataTypes.SMALLINT,
        validate: {
          min: 1800,
          isNotFutureYear (value) {
            const currentYear = new Date().getFullYear();

            if (value > currentYear) {
              throw new Error(
                `Founded year cannot be later than ${currentYear}`
              );
            }
          },
        },
      },
      logo: {
        type: DataTypes.TEXT,
        validate: {
          isUrl: {
            msg: 'Photo must be a valid URL',
          },
        },
      },
      description: {
        type: DataTypes.STRING(2000),
      },
    },
    {
      sequelize,
      modelName: 'Studio',
      underscored: true,
    }
  );
  return Studio;
};
