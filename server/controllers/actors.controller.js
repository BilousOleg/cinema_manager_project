const createHttpError = require('http-errors');
const _ = require('lodash');
const { Actor, Person, Country, Movie } = require('../db/models');

module.exports.createActor = async (req, res, next) => {
  const { body } = req;

  try {
    if (body.countryId != null) {
      const country = await Country.findByPk(body.countryId);

      if (!country) {
        return next(createHttpError(400, 'Invalid countryId'));
      }
    }

    const createdPerson = await Person.create(body);

    const createdActor = await Actor.create({
      personId: createdPerson.id,
    });

    const preparedPerson = _.omit(createdPerson.get(), [
      'createdAt',
      'updatedAt',
    ]);

    res.status(201).send({
      data: {
        id: createdActor.id,
        Person: preparedPerson,
      },
    });
  } catch (err) {
    next(err);
  }
};

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
          attributes: {
            exclude: ['id', 'createdAt', 'updatedAt'],
          },
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

module.exports.updateActorById = async (req, res, next) => {
  const {
    params: { id },
    body,
  } = req.params;

  try {
    const foundActor = await Actor.findByPk(id, {
      include: [{ model: Person }],
    });

    if (!foundActor) {
      return next(createHttpError(404, 'Actor Not Found'));
    }

    if (body.countryId != null) {
      const country = await Country.findByPk(body.countryId);

      if (!country) {
        return next(createHttpError(400, 'Invalid countryId'));
      }
    }

    await foundActor.Person.update(body);

    const updatedActor = await Actor.findByPk(id, {
      attributes: ['id'],
      include: [
        {
          model: Person,
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
      ],
    });

    res.status(200).send({ data: updatedActor });
  } catch (err) {
    next(err);
  }
};
