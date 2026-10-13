const createHttpError = require('http-errors');
const _ = require('lodash');
const {
  Movie,
  Genre,
  Actor,
  Director,
  Studio,
  Person,
  sequelize,
} = require('../db/models');

module.exports.createMovie = async (req, res, next) => {
  try {
    const { genreIds, actorIds, directorIds, studioIds, ...movieData } =
      req.body;

    // Транзакція для виконання декількох запитів до бд у форматі "Все або нічого"
    const createdMovie = await sequelize.transaction(async transaction => {
      const movie = await Movie.create(movieData, { transaction });

      await movie.setGenres(genreIds, { transaction });
      await movie.setActors(actorIds, { transaction });
      await movie.setDirectors(directorIds, { transaction });
      await movie.setStudios(studioIds, { transaction });

      return movie;
    });

    res.status(201).send({ data: createdMovie });
  } catch (err) {
    next(err);
  }
};

module.exports.getMovies = async (req, res, next) => {
  const { page, limit, offset } = req.pagination;

  try {
    const { rows: foundMovies, count } = await Movie.findAndCountAll({
      raw: true,
      attributes: ['id', 'poster', 'title', 'year'],
      limit,
      offset,
      order: ['createdAt'],
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

module.exports.updateMovieById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const { genreIds, actorIds, directorIds, studioIds, ...movieData } =
      req.body;

    // Транзакція для виконання декількох запитів до бд у форматі "Все або нічого"
    const updatedMovie = await sequelize.transaction(async transaction => {
      const movie = await Movie.findByPk(id, { transaction });

      if (!movie) {
        throw createHttpError(404, 'Movie Not Found');
      }

      await movie.update(movieData, { transaction });

      await movie.setGenres(genreIds, { transaction });
      await movie.setActors(actorIds, { transaction });
      await movie.setDirectors(directorIds, { transaction });
      await movie.setStudios(studioIds, { transaction });

      return movie;
    });

    res.status(200).send({ data: updatedMovie });
  } catch (err) {
    next(err);
  }
};
