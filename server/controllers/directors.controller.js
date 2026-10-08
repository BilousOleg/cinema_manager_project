const { Director, Person, Country, Movie } = require('../db/models');

module.exports.getDirectors = async (req, res, next) => {
  try {
    const foundDirectors = await Director.findAll({
      attributes: ['id'],
      include: [
        {
          model: Person,
          attributes: ['photo', 'firstName', 'lastName'],
        },
      ],
    });

    res.status(200).send({ data: foundDirectors });
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

    res.status(200).send({ data: foundDirector });
  } catch (err) {
    next(err);
  }
};
