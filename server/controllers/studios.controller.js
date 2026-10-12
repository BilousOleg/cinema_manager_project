const createHttpError = require('http-errors');
const _ = require('lodash');
const { Studio, Country, Movie } = require('../db/models');

module.exports.createStudio = async (req, res, next) => {
  const { body } = req;

  try {
    if (body.countryId != null) {
      const country = await Country.findByPk(body.countryId);

      if (!country) {
        return next(createHttpError(400, 'Invalid countryId'));
      }
    }

    const createdStudio = await Studio.create(body);

    const preparedStudio = _.omit(createdStudio.get(), [
      'createdAt',
      'updatedAt',
    ]);

    res.status(201).send({
      data: preparedStudio,
    });
  } catch (err) {
    next(err);
  }
};

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

module.exports.updateStudioById = async (req, res, next) => {
  const {
    params: { id },
    body,
  } = req;

  try {
    const foundStudio = await Studio.findByPk(id);

    if (!foundStudio) {
      return next(createHttpError(404, 'Studio Not Found'));
    }

    if (body.countryId != null) {
      const country = await Country.findByPk(body.countryId);

      if (!country) {
        return next(createHttpError(400, 'Invalid countryId'));
      }
    }

    const [, [updatedStudio]] = await Studio.update(body, {
      raw: true,
      where: { id },
      returning: true,
    });

    const preparedStudio = _.omit(updatedStudio, ['createdAt', 'updatedAt']);

    res.status(200).send({ data: preparedStudio });
  } catch (err) {
    next(err);
  }
};
