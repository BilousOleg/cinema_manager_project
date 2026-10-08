const { Studio, Country, Movie } = require('../db/models');

module.exports.getStudios = async (req, res, next) => {
  try {
    const foundStudios = await Studio.findAll({
      raw: true,
      attributes: ['id', 'logo', 'studioName'],
    });

    res.status(200).send({ data: foundStudios });
  } catch (err) {
    next(err);
  }
};

module.exports.getStudioById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const foundStudio = await Studio.findByPk(id, {
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      include: [
        {
          model: Country,
          attributes: ['countryName'],
        },
        {
          model: Movie,
          attributes: ['id', 'title'],
          through: {
            attributes: [],
          },
        },
      ],
    });

    res.status(200).send({ data: foundStudio });
  } catch (err) {
    next(err);
  }
};
