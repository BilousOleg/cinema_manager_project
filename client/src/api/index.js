import axios from 'axios';

const httpClient = axios.create({ baseURL: 'http://localhost:5000/api' });

export const getMovies = async () => httpClient.get('/movies');
export const getMovieById = async id => httpClient.get(`/movies/${id}`);

export const getActors = async () => httpClient.get('/actors');
export const getActorById = async id => httpClient.get(`/actors/${id}`);

export const getDirectors = async () => httpClient.get('/directors');
export const getDirectorById = async id => httpClient.get(`/directors/${id}`);

export const getStudios = async () => httpClient.get('/studios');
export const getStudioById = async id => httpClient.get(`/studios/${id}`);

export const getTotalCounts = async () =>
  httpClient.get('/dashboard/total-counts');

export const getPopularGenres = async (limit = 3) =>
  httpClient.get('/dashboard/popular-genres', {
    params: { limit },
  });

export const getRecentMovies = async (limit = 3) =>
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
