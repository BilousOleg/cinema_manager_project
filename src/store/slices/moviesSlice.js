import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  movies: [
    {
      id: 1,
      title: 'Interstellar',
      year: 2014,
      genre: 'Science Fiction',
      country: 'USA',
      duration: 169,
      description:
        'A team of astronauts travels through a wormhole in search of a new home for humanity.',
      poster: '/staticImages/posters/interstellar.jpg',
      trailer: 'https://www.youtube.com/watch?v=zSWdZVtXT7E',
      studioId: 1,
      directorId: 1,
      actorIds: [1, 2, 3],
    },
    {
      id: 2,
      title: 'Joker',
      year: 2019,
      genre: 'Drama',
      country: 'USA',
      duration: 122,
      description:
        'Arthur Fleck slowly descends into madness and becomes the Joker.',
      poster: '/staticImages/posters/joker.jpg',
      trailer: 'https://www.youtube.com/watch?v=zAGVQLHvwOY',
      studioId: 2,
      directorId: 2,
      actorIds: [4],
    },
    {
      id: 3,
      title: 'Oppenheimer',
      year: 2023,
      genre: 'Biography',
      country: 'USA',
      duration: 180,
      description:
        'The story of physicist J. Robert Oppenheimer and the Manhattan Project.',
      poster: '/staticImages/posters/oppenheimer.jpg',
      trailer: 'https://www.youtube.com/watch?v=uYPbbksJxIg',
      studioId: 3,
      directorId: 1,
      actorIds: [5, 6],
    },
    {
      id: 4,
      title: 'The Matrix',
      year: 1999,
      genre: 'Science Fiction',
      country: 'USA',
      duration: 136,
      description: 'A hacker discovers that reality is a computer simulation.',
      poster: '/staticImages/posters/matrix.jpg',
      trailer: 'https://www.youtube.com/watch?v=vKQi3bBA1y8',
      studioId: 4,
      directorId: 3,
      actorIds: [7, 8],
    },
    {
      id: 5,
      title: 'Inception',
      year: 2010,
      genre: 'Science Fiction',
      country: 'USA',
      duration: 148,
      description: "A thief enters people's dreams to steal secrets.",
      poster: '/staticImages/posters/inception.jpg',
      trailer: 'https://www.youtube.com/watch?v=YoHD9XEInc0',
      studioId: 1,
      directorId: 1,
      actorIds: [9, 10],
    },
  ],
};

const moviesSlice = createSlice({
  initialState,
  name: 'movies',
  reducers: {},
});

const { reducer, actions } = moviesSlice;

export default reducer;
