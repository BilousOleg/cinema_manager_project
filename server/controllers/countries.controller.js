const { Country } = require('../db/models');

module.exports.getCountries = async (req, res, next) => {
  try {
    const foundCountries = await Country.findAll({
      raw: true,
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });

    res.status(200).send({ data: foundCountries });
  } catch (err) {
    next(err);
  }
};
