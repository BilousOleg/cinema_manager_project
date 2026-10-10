const createHttpError = require('http-errors');
const { Actor, Person, Country, Movie } = require('../db/models');

module.exports.getActors = async (req, res, next) => {
  const { page, limit, offset } = req.pagination;

  try {
    const { rows: foundActors, count } = await Actor.findAndCountAll({
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
      data: foundActors,
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

module.exports.getActorById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const foundActor = await Actor.findByPk(id, {
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

    if (!foundActor) {
      return next(createHttpError(404, 'Actor Not Found'));
    }

    res.status(200).send({ data: foundActor });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteActorById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedCount = await Actor.destroy({ where: { id } });

    if (!deletedCount) {
      return next(createHttpError(404, 'Actor Not Found'));
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
