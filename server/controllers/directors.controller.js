const createHttpError = require('http-errors');
const _ = require('lodash');
const { Director, Person, Country, Movie } = require('../db/models');

module.exports.createDirector = async (req, res, next) => {
  const { body } = req;

  try {
    if (body.countryId != null) {
      const country = await Country.findByPk(body.countryId);

      if (!country) {
        return next(createHttpError(400, 'Invalid countryId'));
      }
    }

    const createdPerson = await Person.create(body);

    const createdDirector = await Director.create({
      personId: createdPerson.id,
    });

    const preparedPerson = _.omit(createdPerson.get(), [
      'createdAt',
      'updatedAt',
    ]);

    res.status(201).send({
      data: {
        id: createdDirector.id,
        Person: preparedPerson,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getDirectors = async (req, res, next) => {
  const { page, limit, offset } = req.pagination;

  try {
    const { rows: foundDirectors, count } = await Director.findAndCountAll({
      attributes: ['id'],
      limit,
      offset,
      order: ['createdAt'],
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
    const director = await Director.findByPk(id);

    if (!director) {
      return next(createHttpError(404, 'Director Not Found'));
    }

    const { personId } = director;

    await director.destroy();
    await Person.destroy({ where: { id: personId } });

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports.updateDirectorById = async (req, res, next) => {
  const {
    params: { id },
    body,
  } = req;

  try {
    const foundDirector = await Director.findByPk(id, {
      include: [{ model: Person }],
    });

    if (!foundDirector) {
      return next(createHttpError(404, 'Director Not Found'));
    }

    if (body.countryId != null) {
      const country = await Country.findByPk(body.countryId);

      if (!country) {
        return next(createHttpError(400, 'Invalid countryId'));
      }
    }

    await foundDirector.Person.update(body);

    const updatedDirector = await Director.findByPk(id, {
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

    res.status(200).send({ data: updatedDirector });
  } catch (err) {
    next(err);
  }
};
