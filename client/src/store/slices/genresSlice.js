import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as API from '../../api';

const GENRES_SLICE_NAME = 'genres';

const initialState = {
  genres: [],
  isFetching: false,
  error: null,
};

export const loadGenresThunk = createAsyncThunk(
  `${GENRES_SLICE_NAME}/loadGenres`,
  async (_, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await API.getGenres();

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.[0]?.title ||
          error.message ||
          'Failed to load genres'
      );
    }
  }
);

const genresSlice = createSlice({
  initialState,
  name: GENRES_SLICE_NAME,
  extraReducers: buidler => {
    buidler
      .addCase(loadGenresThunk.pending, state => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(loadGenresThunk.fulfilled, (state, { payload }) => {
        state.genres = payload;
        state.isFetching = false;
      })
      .addCase(loadGenresThunk.rejected, (state, { payload }) => {
        state.error = payload;
        state.isFetching = false;
      });
  },
});

const { reducer } = genresSlice;

export default reducer;
