const { sequelize } = require('../db/models');
const {
  Movie,
  Actor,
  Director,
  Studio,
  Genre,
  MoviesToGenres,
} = require('../db/models');

module.exports.getTotalCounts = async (req, res, next) => {
  try {
    const [movies, actors, directors, studios] = await Promise.all([
      Movie.count(),
      Actor.count(),
      Director.count(),
      Studio.count(),
    ]);

    res.status(200).send({
      data: {
        movies,
        actors,
        directors,
        studios,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getRecentMovies = async (req, res, next) => {
  const { limit } = req.query;

  try {
    const recentMovies = await Movie.findAll({
      attributes: ['id', 'title', 'year', 'poster'],
      order: [['createdAt', 'DESC']],
      limit,
    });

    res.status(200).send({ data: recentMovies });
  } catch (err) {
    next(err);
  }
};

module.exports.getPopularGenres = async (req, res, next) => {
  const { limit } = req.query;

  try {
    const [popularGenres] = await sequelize.query(`
      SELECT g.id, g.genre_name AS "genreName"
      FROM genres AS g
      INNER JOIN movies_to_genres AS mtog
        ON g.id = mtog.genre_id
      GROUP BY g.id, g.genre_name
      ORDER BY COUNT(mtog.movie_id) DESC
      LIMIT ${limit}
    `);

    res.status(200).send({ data: popularGenres });
  } catch (err) {
    next(err);
  }
};
