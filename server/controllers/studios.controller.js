const createHttpError = require('http-errors');
const { Studio, Country, Movie } = require('../db/models');

module.exports.getStudios = async (req, res, next) => {
  const { page, limit, offset } = req.pagination;

  try {
    const { rows: foundStudios, count } = await Studio.findAndCountAll({
      raw: true,
      attributes: ['id', 'logo', 'studioName'],
      limit,
      offset,
      order: ['id'],
    });

    res.status(200).send({
      data: foundStudios,
      pagination: {
        page,
        results: limit,
        total: count,
        totalPages: Math.ceil(count / limit),
      },
    });
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

    if (!foundStudio) {
      return next(createHttpError(404, 'Studio Not Found'));
    }

    res.status(200).send({ data: foundStudio });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteStudioById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedCount = await Studio.destroy({ where: { id } });

    if (!deletedCount) {
      return next(createHttpError(404, 'Studio Not Found'));
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
