import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import * as API from './../../api';
import CONSTANTS from '../../constants';

const {
  STORAGE_KEYS: { DIRECTORS },
} = CONSTANTS;

const DIRECTORS_SLICE_NAME = 'directors';

const initialState = {
  directors: [],
  isFetching: false,
  error: null,
};

export const addDirectorThunk = createAsyncThunk(
  `${DIRECTORS_SLICE_NAME}/addDirector`,
  async (director, { rejectWithValue }) => {
    try {
      const newDirector = {
        id: uuidv4(),
        ...director,
      };

      const directors = API.getStoredEntities(DIRECTORS);
      directors.push(newDirector);
      API.setStoredEntities(DIRECTORS, directors);

      return newDirector;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to add director');
    }
  }
);

export const updateDirectorThunk = createAsyncThunk(
  `${DIRECTORS_SLICE_NAME}/updateDirector`,
  async (director, { rejectWithValue }) => {
    try {
      const directors = API.getStoredEntities(DIRECTORS);
      const storedDirector = directors.find(d => d.id === director.id);

      if (!storedDirector) {
        throw new Error('Director not found');
      }

      Object.assign(storedDirector, director);
      API.setStoredEntities(DIRECTORS, directors);

      return storedDirector;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update director');
    }
  }
);

export const deleteDirectorThunk = createAsyncThunk(
  `${DIRECTORS_SLICE_NAME}/deleteDirector`,
  async (directorId, { rejectWithValue }) => {
    try {
      const directors = API.getStoredEntities(DIRECTORS);
      const isDirectorExists = directors.some(d => d.id === directorId);

      if (!isDirectorExists) {
        throw new Error('Director not found');
      }

      const updatedDirectors = directors.filter(d => d.id !== directorId);
      API.setStoredEntities(DIRECTORS, updatedDirectors);

      return directorId;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete director');
    }
  }
);

export const loadDirectorsThunk = createAsyncThunk(
  `${DIRECTORS_SLICE_NAME}/loadDirectors`,
  async (_, { rejectWithValue }) => {
    try {
      const directors = API.getStoredEntities(DIRECTORS);

      return directors;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to load directors');
    }
  }
);

const directorsSlice = createSlice({
  initialState,
  name: DIRECTORS_SLICE_NAME,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(addDirectorThunk.pending, state => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(addDirectorThunk.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.directors.push(payload);
      })
      .addCase(addDirectorThunk.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.error = payload;
      })
      .addCase(updateDirectorThunk.pending, state => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(updateDirectorThunk.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        const director = state.directors.find(d => d.id === payload.id);

        if (director) {
          Object.assign(director, payload);
        }
      })
      .addCase(updateDirectorThunk.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.error = payload;
      })
      .addCase(deleteDirectorThunk.pending, state => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(deleteDirectorThunk.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.directors = state.directors.filter(d => d.id !== payload);
      })
      .addCase(deleteDirectorThunk.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.error = payload;
      })
      .addCase(loadDirectorsThunk.pending, state => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(loadDirectorsThunk.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.directors = payload;
      })
      .addCase(loadDirectorsThunk.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.error = payload;
      });
  },
});

const { reducer } = directorsSlice;

export default reducer;
