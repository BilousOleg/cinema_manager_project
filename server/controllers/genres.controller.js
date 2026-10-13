const { Genre } = require('../db/models');

module.exports.getGenres = async (req, res, next) => {
  try {
    const foundGenres = await Genre.findAll({
      raw: true,
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });

    res.status(200).send({ data: foundGenres });
  } catch (err) {
    next(err);
  }
};
