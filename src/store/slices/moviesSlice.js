import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  movies: [],
};

const moviesSlice = createSlice({
  initialState,
  name: 'movies',
  reducers: {
    addMovie: (state, { payload }) => {
      state.movies.push({
        id: uuidv4(),
        ...payload,
        genreId: Number(payload.genreId),
      });
    },
    updateMovie (state, { payload }) {
      const movie = state.movies.find(m => m.id === payload.id);

      if (movie) {
        Object.assign(movie, {
          ...payload,
          genreId: Number(payload.genreId),
        });
      }
    },
    deleteMovie: (state, { payload }) => {
      state.movies = state.movies.filter(m => m.id !== payload);
    },
  },
});

const { reducer, actions } = moviesSlice;

export const { addMovie, updateMovie, deleteMovie } = actions;

export default reducer;
