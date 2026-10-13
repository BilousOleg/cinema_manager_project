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
      fields: ['title', 'year', 'poster', 'trailer'],
    },
    { label: 'Genres', fields: ['genreIds'] },
    { label: 'Directors', fields: ['directorIds'] },
    { label: 'Actors', fields: ['actorIds'] },
    { label: 'Studios', fields: ['studioIds'] },
    { label: 'Storyline', fields: ['description'] },
  ],
  EMPTY_FORM_VALUES: {
    EMPTY_MOVIE: {
      title: '',
      genreIds: [],
      year: '',
      poster: '',
      trailer: '',
      directorIds: [],
      actorIds: [],
      studioIds: [],
      description: '',
    },
    EMPTY_ACTOR: {
      firstName: '',
      lastName: '',
      birthDate: '',
      countryId: '',
      photo: '',
      biography: '',
    },
    EMPTY_DIRECTOR: {
      firstName: '',
      lastName: '',
      birthDate: '',
      countryId: '',
      photo: '',
      biography: '',
    },
    EMPTY_STUDIO: {
      studioName: '',
      countryId: '',
      founded: '',
      logo: '',
      description: '',
    },
  },
  THEMES: {
    DARK: 'dark',
    LIGHT: 'light',
  },
  DEFAULT_PAGE: 1,
  DEFAULT_RESULTS: 8,
  STORAGE_KEYS: {
    THEME: 'theme',
  },
};

export default CONSTANTS;
