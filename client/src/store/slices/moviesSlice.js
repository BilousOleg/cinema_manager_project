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
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
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
      await API.deleteMovieById(movieId);

      return movieId;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete movie');
    }
  }
);

export const loadMoviesThunk = createAsyncThunk(
  `${MOVIES_SLICE_NAME}/loadMovies`,
  async ({ page, results }, { rejectWithValue }) => {
    try {
      const {
        data: { data, pagination },
      } = await API.getMovies(page, results);

      return { data, pagination };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to load movies');
    }
  }
);

export const loadMovieByIdThunk = createAsyncThunk(
  `${MOVIES_SLICE_NAME}/loadMovie`,
  async (movieId, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await API.getMovieById(movieId);

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
      .addCase(
        loadMoviesThunk.fulfilled,
        (state, { payload: { data, pagination } }) => {
          state.movies = data;
          state.pagination = pagination;
          state.isFetching = false;
        }
      )
      .addCase(loadMoviesThunk.rejected, (state, { payload: { data } }) => {
        state.error = data;
        state.isFetching = false;
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
