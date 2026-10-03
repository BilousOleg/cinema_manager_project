import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './slices/moviesSlice';
import actorsReducer from './slices/actorsSlice';
import directorsReducer from './slices/directorsSlice';
import studiosReducer from './slices/studiosSlice';
import serviceReducer from './slices/serviceSlice';
import themeReducer from './slices/themeSlice';

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    actors: actorsReducer,
    directors: directorsReducer,
    studios: studiosReducer,
    service: serviceReducer,
    theme: themeReducer,
  },
});

export default store;
