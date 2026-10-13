import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as API from './../../api';
import { normalizeFormValues } from '../../utils/formValues';

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

export const createMovieThunk = createAsyncThunk(
  `${MOVIES_SLICE_NAME}/addMovie`,
  async (movie, { rejectWithValue }) => {
    try {
      const normalizedMovie = normalizeFormValues(movie);

      const {
        data: { data },
      } = await API.createMovie(normalizedMovie);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.[0]?.title ||
          error.message ||
          'Failed to add movie'
      );
    }
  }
);

export const updateMovieThunk = createAsyncThunk(
  `${MOVIES_SLICE_NAME}/updateMovie`,
  async ({ id, movie }, { rejectWithValue }) => {
    try {
      const normalizedMovie = normalizeFormValues(movie);

      const {
        data: { data },
      } = await API.updateMovieById(id, normalizedMovie);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.[0]?.title ||
          error.message ||
          'Failed to update movie'
      );
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
      return rejectWithValue(
        error.response?.data?.[0]?.title ||
          error.message ||
          'Failed to delete movie'
      );
    }
  }
);

export const loadMoviesThunk = createAsyncThunk(
  `${MOVIES_SLICE_NAME}/loadMovies`,
  async (params, { rejectWithValue }) => {
    try {
      const {
        data: { data, pagination },
      } = await API.getMovies(params);

      return { data, pagination };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.[0]?.title ||
          error.message ||
          'Failed to load movies'
      );
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
      return rejectWithValue(
        error.response?.data?.[0]?.title ||
          error.message ||
          'Failed to load movies'
      );
    }
  }
);

const moviesSlice = createSlice({
  initialState,
  name: MOVIES_SLICE_NAME,
  reducers: {
    clearCurrentMovie: state => {
      state.currentMovie = null;
    },
  },
  extraReducers: builder => {
    builder
      // create
      .addCase(createMovieThunk.pending, state => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(createMovieThunk.fulfilled, state => {
        state.isFetching = false;
      })
      .addCase(createMovieThunk.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.error = payload;
      })
      // updateById
      .addCase(updateMovieThunk.pending, state => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(updateMovieThunk.fulfilled, state => {
        state.isFetching = false;
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
      .addCase(deleteMovieThunk.fulfilled, state => {
        state.isFetching = false;
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

const { reducer, actions } = moviesSlice;

export const { clearCurrentMovie } = actions;

export default reducer;
