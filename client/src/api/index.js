import axios from 'axios';

const httpClient = axios.create({ baseURL: 'http://localhost:5000/api' });

export const getMovies = (page, results) =>
  httpClient.get('/movies', {
    params: {
      page,
      results,
    },
  });
export const getMovieById = id => httpClient.get(`/movies/${id}`);
export const deleteMovieById = id => httpClient.delete(`/movies/${id}`);

export const getActors = (page, results) =>
  httpClient.get('/actors', {
    params: {
      page,
      results,
    },
  });
export const getActorById = id => httpClient.get(`/actors/${id}`);
export const deleteActorById = id => httpClient.delete(`/actors/${id}`);

export const getDirectors = async (page, results) =>
  httpClient.get('/directors', {
    params: {
      page,
      results,
    },
  });
export const getDirectorById = id => httpClient.get(`/directors/${id}`);
export const deleteDirectorById = id => httpClient.delete(`/directors/${id}`);

export const getStudios = (page, results) =>
  httpClient.get('/studios', {
    params: {
      page,
      results,
    },
  });
export const getStudioById = id => httpClient.get(`/studios/${id}`);
export const deleteStudioById = id => httpClient.delete(`/studios/${id}`);

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
