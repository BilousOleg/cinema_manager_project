const GENRES = [
  {
    id: 1,
    name: 'Action',
  },
  {
    id: 2,
    name: 'Adventure',
  },
  {
    id: 3,
    name: 'Biography',
  },
  {
    id: 4,
    name: 'Comedy',
  },
  {
    id: 5,
    name: 'Crime',
  },
  {
    id: 6,
    name: 'Drama',
  },
  {
    id: 7,
    name: 'Fantasy',
  },
  {
    id: 8,
    name: 'Horror',
  },
  {
    id: 9,
    name: 'Romance',
  },
  {
    id: 10,
    name: 'Science Fiction',
  },
  {
    id: 11,
    name: 'Thriller',
  },
];

const CONSTANTS = {
  STATIC_IMAGES_PATH: '/staticImages/',
  ROUTES: {
    HOME: '/',
    MOVIES: '/movies',
    ACTORS: '/actors',
    DIRECTORS: '/directors',
    STUDIOS: '/studios',
  },
  ENTITIES: {
    MOVIES: 'movies',
    ACTORS: 'actors',
    DIRECTORS: 'directors',
    STUDIOS: 'studios',
  },
  MOVIE_FORM_STEPS: [
    {
      label: 'General',
      fields: ['title', 'genreId', 'year', 'poster', 'trailer'],
    },
    { label: 'Director', fields: ['directorId'] },
    { label: 'Actors', fields: ['actorIds'] },
    { label: 'Studio', fields: ['studioId'] },
    { label: 'Storyline', fields: ['description'] },
  ],
  GENRES,
  GENRES_BY_ID: Object.fromEntries(GENRES.map(genre => [genre.id, genre])),
};

export default CONSTANTS;
