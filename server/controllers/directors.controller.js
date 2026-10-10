const createHttpError = require('http-errors');
const { Director, Person, Country, Movie } = require('../db/models');

module.exports.getDirectors = async (req, res, next) => {
  const { page, limit, offset } = req.pagination;

  try {
    const { rows: foundDirectors, count } = await Director.findAndCountAll({
      attributes: ['id'],
      limit,
      offset,
      order: ['id'],
      include: [
        {
          model: Person,
          attributes: ['photo', 'firstName', 'lastName'],
        },
      ],
    });

    res.status(200).send({
      data: foundDirectors,
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

module.exports.getDirectorById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const foundDirector = await Director.findByPk(id, {
      attributes: ['id'],
      include: [
        {
          model: Person,
          attributes: [
            'firstName',
            'lastName',
            'birthDate',
            'photo',
            'biography',
          ],
          include: [
            {
              model: Country,
              attributes: ['countryName'],
            },
          ],
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

    if (!foundDirector) {
      return next(createHttpError(404, 'Director Not Found'));
    }

    res.status(200).send({ data: foundDirector });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteDirectorById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedCount = await Director.destroy({ where: { id } });

    if (!deletedCount) {
      return next(createHttpError(404, 'Director Not Found'));
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
