import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as API from '../../api';

const DASHBOARD_SLICE_NAME = 'dashboard';

const initialState = {
  totalCounts: {
    movies: 0,
    actors: 0,
    directors: 0,
    studios: 0,
  },
  popularGenres: [],
  recentMovies: [],
  isFetchingTotalCounts: true,
  isFetchingPopularGenres: true,
  isFetchingRecentMovies: true,
  totalCountsError: null,
  popularGenresError: null,
  recentMoviesError: null,
};

export const loadTotalCountsThunk = createAsyncThunk(
  `${DASHBOARD_SLICE_NAME}/loadTotalCounts`,
  async (_, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await API.getTotalCounts();

      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to load total counts');
    }
  }
);

export const loadPopularGenresThunk = createAsyncThunk(
  `${DASHBOARD_SLICE_NAME}/loadPopularGenres`,
  async (_, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await API.getPopularGenres();

      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to load popular genres');
    }
  }
);

export const loadRecentMoviesThunk = createAsyncThunk(
  `${DASHBOARD_SLICE_NAME}/loadRecentMovies`,
  async (_, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await API.getRecentMovies();

      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to load recent movies');
    }
  }
);

const dashboardSlice = createSlice({
  initialState,
  name: DASHBOARD_SLICE_NAME,
  extraReducers: builder => {
    builder
      // total counts
      .addCase(loadTotalCountsThunk.pending, state => {
        state.isFetchingTotalCounts = true;
        state.totalCountsError = null;
      })
      .addCase(loadTotalCountsThunk.fulfilled, (state, { payload }) => {
        state.isFetchingTotalCounts = false;
        state.totalCounts = payload;
      })
      .addCase(loadTotalCountsThunk.rejected, (state, { payload }) => {
        state.isFetchingTotalCounts = false;
        state.totalCountsError = payload;
      })
      // popular genres
      .addCase(loadPopularGenresThunk.pending, state => {
        state.isFetchingPopularGenres = true;
        state.popularGenresError = null;
      })
      .addCase(loadPopularGenresThunk.fulfilled, (state, { payload }) => {
        state.isFetchingPopularGenres = false;
        state.popularGenres = payload;
      })
      .addCase(loadPopularGenresThunk.rejected, (state, { payload }) => {
        state.isFetchingPopularGenres = false;
        state.popularGenresError = payload;
      })
      // recent movies
      .addCase(loadRecentMoviesThunk.pending, state => {
        state.isFetchingRecentMovies = true;
        state.recentMoviesError = null;
      })
      .addCase(loadRecentMoviesThunk.fulfilled, (state, { payload }) => {
        state.isFetchingRecentMovies = false;
        state.recentMovies = payload;
      })
      .addCase(loadRecentMoviesThunk.rejected, (state, { payload }) => {
        state.isFetchingRecentMovies = false;
        state.recentMoviesError = payload;
      });
  },
});

const { reducer } = dashboardSlice;

export default reducer;
