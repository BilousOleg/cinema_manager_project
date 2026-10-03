import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import * as API from './../../api';
import CONSTANTS from '../../constants';

const {
  STORAGE_KEYS: { STUDIOS },
} = CONSTANTS;

const STUDIOS_SLICE_NAME = 'studios';

const initialState = {
  studios: [],
  isFetching: false,
  error: null,
};

export const addStudioThunk = createAsyncThunk(
  `${STUDIOS_SLICE_NAME}/addStudio`,
  async (studio, { rejectWithValue }) => {
    try {
      const newStudio = {
        id: uuidv4(),
        ...studio,
      };

      const studios = API.getStoredEntities(STUDIOS);
      studios.push(newStudio);
      API.setStoredEntities(STUDIOS, studios);

      return newStudio;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to add studio');
    }
  }
);

export const updateStudioThunk = createAsyncThunk(
  `${STUDIOS_SLICE_NAME}/updateStudio`,
  async (studio, { rejectWithValue }) => {
    try {
      const studios = API.getStoredEntities(STUDIOS);
      const storedStudio = studios.find(s => s.id === studio.id);

      if (!storedStudio) {
        throw new Error('Studio not found');
      }

      Object.assign(storedStudio, studio);
      API.setStoredEntities(STUDIOS, studios);

      return storedStudio;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update studio');
    }
  }
);

export const deleteStudioThunk = createAsyncThunk(
  `${STUDIOS_SLICE_NAME}/deleteStudio`,
  async (studioId, { rejectWithValue }) => {
    try {
      const studios = API.getStoredEntities(STUDIOS);
      const isStudioExists = studios.some(s => s.id === studioId);

      if (!isStudioExists) {
        throw new Error('Studio not found');
      }

      const updatedStudios = studios.filter(s => s.id !== studioId);
      API.setStoredEntities(STUDIOS, updatedStudios);

      return studioId;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete studio');
    }
  }
);

export const loadStudiosThunk = createAsyncThunk(
  `${STUDIOS_SLICE_NAME}/loadStudios`,
  async (_, { rejectWithValue }) => {
    try {
      const studios = API.getStoredEntities(STUDIOS);

      return studios;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to load studios');
    }
  }
);

const studiosSlice = createSlice({
  initialState,
  name: STUDIOS_SLICE_NAME,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(addStudioThunk.pending, state => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(addStudioThunk.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.studios.push(payload);
      })
      .addCase(addStudioThunk.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.error = payload;
      })
      .addCase(updateStudioThunk.pending, state => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(updateStudioThunk.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        const studio = state.studios.find(s => s.id === payload.id);

        if (studio) {
          Object.assign(studio, payload);
        }
      })
      .addCase(updateStudioThunk.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.error = payload;
      })
      .addCase(deleteStudioThunk.pending, state => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(deleteStudioThunk.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.studios = state.studios.filter(s => s.id !== payload);
      })
      .addCase(deleteStudioThunk.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.error = payload;
      })
      .addCase(loadStudiosThunk.pending, state => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(loadStudiosThunk.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.studios = payload;
      })
      .addCase(loadStudiosThunk.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.error = payload;
      });
  },
});

const { reducer } = studiosSlice;

export default reducer;
