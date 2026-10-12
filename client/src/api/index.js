import axios from 'axios';

const httpClient = axios.create({ baseURL: 'http://localhost:5000/api' });

export const getCountries = () => httpClient.get('/countries');

export const createMovie = data => httpClient.post('/movies', data);
export const getMovies = params => httpClient.get('/movies', { params });
export const getMovieById = id => httpClient.get(`/movies/${id}`);
export const deleteMovieById = id => httpClient.delete(`/movies/${id}`);

export const createActor = data => httpClient.post('/actors', data);
export const getActors = params => httpClient.get('/actors', { params });
export const getActorById = id => httpClient.get(`/actors/${id}`);
export const deleteActorById = id => httpClient.delete(`/actors/${id}`);
export const updateActorById = (id, data) =>
  httpClient.patch(`/actors/${id}`, data);

export const createDirector = data => httpClient.post('/directors', data);
export const getDirectors = params => httpClient.get('/directors', { params });
export const getDirectorById = id => httpClient.get(`/directors/${id}`);
export const deleteDirectorById = id => httpClient.delete(`/directors/${id}`);
export const updateDirectorById = (id, data) =>
  httpClient.patch(`/directors/${id}`, data);

export const createStudio = data => httpClient.post('/studios', data);
export const getStudios = params => httpClient.get('/studios', { params });
export const getStudioById = id => httpClient.get(`/studios/${id}`);
export const deleteStudioById = id => httpClient.delete(`/studios/${id}`);
export const updateStudioById = (id, data) =>
  httpClient.patch(`/studios/${id}`, data);

export const getTotalCounts = () => httpClient.get('/dashboard/total-counts');

export const getPopularGenres = (limit = 3) =>
  httpClient.get('/dashboard/popular-genres', {
    params: { limit },
  });

export const getRecentMovies = (limit = 3) =>
  httpClient.get('/dashboard/recent-movies', {
    params: { limit },
  });

export const getStoredEntities = key => {
  const data = localStorage.getItem(key);

  return data ? JSON.parse(data) : [];
};

export const setStoredEntities = (key, entities) => {
  localStorage.setItem(key, JSON.stringify(entities));
};
