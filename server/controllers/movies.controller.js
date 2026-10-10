const createHttpError = require('http-errors');
const {
  Movie,
  Genre,
  Actor,
  Director,
  Studio,
  Person,
} = require('../db/models');

module.exports.getMovies = async (req, res, next) => {
  const { page, limit, offset } = req.pagination;

  try {
    const { rows: foundMovies, count } = await Movie.findAndCountAll({
      raw: true,
      attributes: ['id', 'poster', 'title', 'year'],
      limit,
      offset,
      order: ['id'],
    });

    res.status(200).send({
      data: foundMovies,
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

module.exports.createMovie = (req, res, next) => {};

module.exports.getMovieById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const foundMovie = await Movie.findByPk(id, {
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      include: [
        {
          model: Genre,
          attributes: ['id', 'genreName'],
          through: {
            attributes: [],
          },
        },
        {
          model: Actor,
          attributes: ['id'],
          through: {
            attributes: [],
          },
          include: [
            {
              model: Person,
              attributes: ['firstName', 'lastName'],
            },
          ],
        },
        {
          model: Director,
          attributes: ['id'],
          through: {
            attributes: [],
          },
          include: [
            {
              model: Person,
              attributes: ['firstName', 'lastName'],
            },
          ],
        },
        {
          model: Studio,
          attributes: ['id', 'studioName'],
          through: {
            attributes: [],
          },
        },
      ],
    });

    if (!foundMovie) {
      return next(createHttpError(404, 'Movie Not Found'));
    }

    res.status(200).send({ data: foundMovie });
  } catch (err) {
    next(err);
  }
};

module.exports.updateMovieById = (req, res, next) => {};

module.exports.deleteMovieById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedCount = await Movie.destroy({ where: { id } });

    if (!deletedCount) {
      return next(createHttpError(404, 'Movie Not Found'));
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
