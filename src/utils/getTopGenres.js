function getTopGenres (movies, genres, limit = 4) {
  return Object.entries(
    movies.reduce((acc, { genreId }) => {
      acc[genreId] = (acc[genreId] ?? 0) + 1;
      return acc;
    }, {})
  )
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([genreId]) => genres[genreId]);
}

export default getTopGenres;
