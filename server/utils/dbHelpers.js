module.exports.getPersonId = async (
  queryInterface,
  Sequelize,
  firstName,
  lastName
) => {
  const [person] = await queryInterface.sequelize.query(
    `
      SELECT id
      FROM persons
      WHERE first_name = '${firstName}'
        AND last_name = '${lastName}'
    `,
    { type: Sequelize.QueryTypes.SELECT }
  );

  return person.id;
};

module.exports.getMovieId = async (queryInterface, Sequelize, title) => {
  const [movie] = await queryInterface.sequelize.query(
    `
      SELECT id
      FROM movies
      WHERE title = :title
    `,
    {
      replacements: { title },
      type: Sequelize.QueryTypes.SELECT,
    }
  );

  return movie.id;
};
