import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './slices/moviesSlice';
import actorsReducer from './slices/actorsSlice';

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    actors: actorsReducer,
  },
});

export default store;
