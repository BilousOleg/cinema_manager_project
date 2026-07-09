import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './slices/moviesSlice';
import actorsReducer from './slices/actorsSlice';
import directorsReducer from './slices/directorsSlice';

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    actors: actorsReducer,
    directors: directorsReducer,
  },
});

export default store;
