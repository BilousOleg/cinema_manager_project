import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as API from './../../api';
import { normalizeFormValues } from '../../utils/formValues';

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

export const createDirectorThunk = createAsyncThunk(
  `${DIRECTORS_SLICE_NAME}/addDirector`,
  async (director, { rejectWithValue }) => {
    try {
      const normalizedDirector = normalizeFormValues(director);

      const {
        data: { data },
      } = await API.createDirector(normalizedDirector);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.[0]?.title ||
          error.message ||
          'Failed to add director'
      );
    }
  }
);

export const updateDirectorThunk = createAsyncThunk(
  `${DIRECTORS_SLICE_NAME}/updateDirector`,
  async ({ id, director }, { rejectWithValue }) => {
    try {
      const normalizedDirector = normalizeFormValues(director);

      const {
        data: { data },
      } = await API.updateDirectorById(id, normalizedDirector);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.[0]?.title ||
          error.message ||
          'Failed to update director'
      );
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
      return rejectWithValue(
        error.response?.data?.[0]?.title ||
          error.message ||
          'Failed to delete director'
      );
    }
  }
);

export const loadDirectorsThunk = createAsyncThunk(
  `${DIRECTORS_SLICE_NAME}/loadDirectors`,
  async (params, { rejectWithValue }) => {
    try {
      const {
        data: { data, pagination },
      } = await API.getDirectors(params);

      return { data, pagination };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.[0]?.title ||
          error.message ||
          'Failed to load directors'
      );
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
      return rejectWithValue(
        error.response?.data?.[0]?.title ||
          error.message ||
          'Failed to load director'
      );
    }
  }
);

const directorsSlice = createSlice({
  initialState,
  name: DIRECTORS_SLICE_NAME,
  reducers: {
    clearCurrentDirector: state => {
      state.currentDirector = null;
    },
  },
  extraReducers: builder => {
    builder
      // create
      .addCase(createDirectorThunk.pending, state => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(createDirectorThunk.fulfilled, state => {
        state.isFetching = false;
      })
      .addCase(createDirectorThunk.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.error = payload;
      })
      // updateById
      .addCase(updateDirectorThunk.pending, state => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(updateDirectorThunk.fulfilled, state => {
        state.isFetching = false;
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
      .addCase(deleteDirectorThunk.fulfilled, state => {
        state.isFetching = false;
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

const { reducer, actions } = directorsSlice;

export const { clearCurrentDirector } = actions;

export default reducer;
