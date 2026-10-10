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
  currentDirector: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
  isFetching: true,
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
      await API.deleteDirectorById(directorId);

      return directorId;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete director');
    }
  }
);

export const loadDirectorsThunk = createAsyncThunk(
  `${DIRECTORS_SLICE_NAME}/loadDirectors`,
  async ({ page, results }, { rejectWithValue }) => {
    try {
      const {
        data: { data, pagination },
      } = await API.getDirectors(page, results);

      return { data, pagination };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to load directors');
    }
  }
);

export const loadDirectorByIdThunk = createAsyncThunk(
  `${DIRECTORS_SLICE_NAME}/loadDirector`,
  async (directorId, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await API.getDirectorById(directorId);

      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to load director');
    }
  }
);

const directorsSlice = createSlice({
  initialState,
  name: DIRECTORS_SLICE_NAME,
  reducers: {},
  extraReducers: builder => {
    builder
      // create
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
      // updateById
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
      // deleteById
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
      // get
      .addCase(loadDirectorsThunk.pending, state => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(
        loadDirectorsThunk.fulfilled,
        (state, { payload: { data, pagination } }) => {
          state.directors = data;
          state.pagination = pagination;
          state.isFetching = false;
        }
      )
      .addCase(loadDirectorsThunk.rejected, (state, { payload: { data } }) => {
        state.error = data;
        state.isFetching = false;
      })
      // getById
      .addCase(loadDirectorByIdThunk.pending, state => {
        state.isFetching = true;
        state.error = null;
        state.currentDirector = null;
      })
      .addCase(loadDirectorByIdThunk.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.currentDirector = payload;
      })
      .addCase(loadDirectorByIdThunk.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.error = payload;
      });
  },
});

const { reducer } = directorsSlice;

export default reducer;
