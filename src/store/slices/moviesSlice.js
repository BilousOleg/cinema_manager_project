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
        genreId: Number(payload.genreId),
        ...payload,
      });
    },
    deleteMovie: (state, { payload }) => {
      state.movies = state.movies.filter(m => m.id !== payload);
    },
  },
});

const { reducer, actions } = moviesSlice;

export const { addMovie, deleteMovie } = actions;

export default reducer;
