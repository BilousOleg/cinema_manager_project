import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import * as API from './../../api';
import CONSTANTS from '../../constants';

const {
  STORAGE_KEYS: { MOVIES },
} = CONSTANTS;

const MOVIES_SLICE_NAME = 'movies';

const initialState = {
  movies: [],
  currentMovie: null,
  isFetching: true,
  error: null,
};

export const addMovieThunk = createAsyncThunk(
  `${MOVIES_SLICE_NAME}/addMovie`,
  async (movie, { rejectWithValue }) => {
    try {
      const newMovie = {
        id: uuidv4(),
        ...movie,
        genreId: Number(movie.genreId),
      };

      const movies = API.getStoredEntities(MOVIES);
      movies.push(newMovie);
      API.setStoredEntities(MOVIES, movies);

      return newMovie;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to add movie');
    }
  }
);

export const updateMovieThunk = createAsyncThunk(
  `${MOVIES_SLICE_NAME}/updateMovie`,
  async (movie, { rejectWithValue }) => {
    try {
      const movies = API.getStoredEntities(MOVIES);
      const storedMovie = movies.find(m => m.id === movie.id);

      if (!storedMovie) {
        throw new Error('Movie not found');
      }

      Object.assign(storedMovie, {
        ...movie,
        genreId: Number(movie.genreId),
      });
      API.setStoredEntities(MOVIES, movies);

      return storedMovie;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update movie');
    }
  }
);

export const deleteMovieThunk = createAsyncThunk(
  `${MOVIES_SLICE_NAME}/deleteMovie`,
  async (movieId, { rejectWithValue }) => {
    try {
      const movies = API.getStoredEntities(MOVIES);
      const isMovieExists = movies.some(movie => movie.id === movieId);

      if (!isMovieExists) {
        throw new Error('Movie not found');
      }

      const updatedMovies = movies.filter(movie => movie.id !== movieId);
      API.setStoredEntities(MOVIES, updatedMovies);

      return movieId;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete movie');
    }
  }
);

export const loadMoviesThunk = createAsyncThunk(
  `${MOVIES_SLICE_NAME}/loadMovies`,
  async (_, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await API.getMovies();

      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to load movies');
    }
  }
);

export const loadMovieByIdThunk = createAsyncThunk(
  `${MOVIES_SLICE_NAME}/loadMovie`,
  async (payload, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await API.getMovieById(payload);

      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to load movies');
    }
  }
);

const moviesSlice = createSlice({
  initialState,
  name: MOVIES_SLICE_NAME,
  reducers: {},
  extraReducers: builder => {
    builder
      // create
      .addCase(addMovieThunk.pending, state => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(addMovieThunk.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.movies.push(payload);
      })
      .addCase(addMovieThunk.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.error = payload;
      })
      // updateById
      .addCase(updateMovieThunk.pending, state => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(updateMovieThunk.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        const movie = state.movies.find(movie => movie.id === payload.id);

        if (movie) {
          Object.assign(movie, payload);
        }
      })
      .addCase(updateMovieThunk.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.error = payload;
      })
      // deleteById
      .addCase(deleteMovieThunk.pending, state => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(deleteMovieThunk.fulfilled, (state, { payload }) => {
        state.isFetching = false;

        state.movies = state.movies.filter(movie => movie.id !== payload);
      })
      .addCase(deleteMovieThunk.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.error = payload;
      })
      // get
      .addCase(loadMoviesThunk.pending, state => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(loadMoviesThunk.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.movies = payload;
      })
      .addCase(loadMoviesThunk.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.error = payload;
      })
      // getById
      .addCase(loadMovieByIdThunk.pending, state => {
        state.isFetching = true;
        state.error = null;
        state.currentMovie = null;
      })
      .addCase(loadMovieByIdThunk.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.currentMovie = payload;
      })
      .addCase(loadMovieByIdThunk.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.error = payload;
      });
  },
});

const { reducer } = moviesSlice;

export default reducer;
