const {
  ID_VALIDATION_SCHEMA,
  LIMIT_VALIDATION_SCHEMA,
  PAGINATION_VALIDATION_SCHEMA,
} = require('../utils/validationSchemas');

module.exports.validateId = async (req, res, next) => {
  const { id } = req.params;

  try {
    req.params.id = await ID_VALIDATION_SCHEMA.validate(id);

    next();
  } catch (err) {
    next(err);
  }
};

module.exports.validateLimit = async (req, res, next) => {
  const { limit = 3 } = req.query;

  try {
    req.query.limit = await LIMIT_VALIDATION_SCHEMA.validate(limit);

    next();
  } catch (err) {
    next(err);
  }
};

module.exports.validatePagination = async (req, res, next) => {
  try {
    req.query = await PAGINATION_VALIDATION_SCHEMA.validate(req.query, {
      abortEarly: false,
    });

    next();
  } catch (err) {
    next(err);
  }
};
