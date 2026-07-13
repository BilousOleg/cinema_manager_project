import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './slices/moviesSlice';
import actorsReducer from './slices/actorsSlice';
import directorsReducer from './slices/directorsSlice';
import studiosReducer from './slices/studiosSlice';
import serviceReducer from './slices/serviceSlice';

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    actors: actorsReducer,
    directors: directorsReducer,
    studios: studiosReducer,
    service: serviceReducer,
  },
});

export default store;
