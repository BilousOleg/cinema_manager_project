import { configureStore } from '@reduxjs/toolkit';
import countriesReducer from './slices/countriesSlice';
import moviesReducer from './slices/moviesSlice';
import actorsReducer from './slices/actorsSlice';
import directorsReducer from './slices/directorsSlice';
import studiosReducer from './slices/studiosSlice';
import serviceReducer from './slices/serviceSlice';
import themeReducer from './slices/themeSlice';
import dashboardReducer from './slices/dashboardSlice';
import notificationReducer from './slices/notificationSlice';

const store = configureStore({
  reducer: {
    countries: countriesReducer,
    movies: moviesReducer,
    actors: actorsReducer,
    directors: directorsReducer,
    studios: studiosReducer,
    service: serviceReducer,
    theme: themeReducer,
    dashboard: dashboardReducer,
    notification: notificationReducer,
  },
});

export default store;
