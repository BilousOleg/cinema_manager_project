const {
  Movie,
  Genre,
  Actor,
  Director,
  Studio,
  Person,
} = require('../db/models');

module.exports.getMovies = async (req, res, next) => {
  try {
    const foundMovies = await Movie.findAll({
      raw: true,
      attributes: ['id', 'poster', 'title', 'year'],
    });

    res.status(200).send({ data: foundMovies });
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

    res.status(200).send({ data: foundMovie });
  } catch (err) {
    next(err);
  }
};

module.exports.updateMovieById = (req, res, next) => {};

module.exports.deleteMovieById = (req, res, next) => {};
