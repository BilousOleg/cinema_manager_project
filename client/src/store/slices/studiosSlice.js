import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as API from './../../api';
import { normalizeFormValues } from '../../utils/formValues';

const STUDIOS_SLICE_NAME = 'studios';

const initialState = {
  studios: [],
  currentStudio: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
  isFetching: true,
  error: null,
};

export const createStudioThunk = createAsyncThunk(
  `${STUDIOS_SLICE_NAME}/addStudio`,
  async (studio, { rejectWithValue }) => {
    const normalizedStudio = normalizeFormValues(studio);

    try {
      const {
        data: { data },
      } = await API.createStudio(normalizedStudio);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.[0]?.title ||
          error.message ||
          'Failed to add studio'
      );
    }
  }
);

export const updateStudioThunk = createAsyncThunk(
  `${STUDIOS_SLICE_NAME}/updateStudio`,
  async ({ id, studio }, { rejectWithValue }) => {
    try {
      const normalizedStudio = normalizeFormValues(studio);

      const {
        data: { data },
      } = await API.updateStudioById(id, normalizedStudio);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.[0]?.title ||
          error.message ||
          'Failed to update studio'
      );
    }
  }
);

export const deleteStudioThunk = createAsyncThunk(
  `${STUDIOS_SLICE_NAME}/deleteStudio`,
  async (studioId, { rejectWithValue }) => {
    try {
      await API.deleteStudioById(studioId);

      return studioId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.[0]?.title ||
          error.message ||
          'Failed to delete studio'
      );
    }
  }
);

export const loadStudiosThunk = createAsyncThunk(
  `${STUDIOS_SLICE_NAME}/loadStudios`,
  async (params, { rejectWithValue }) => {
    try {
      const {
        data: { data, pagination },
      } = await API.getStudios(params);

      return { data, pagination };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.[0]?.title ||
          error.message ||
          'Failed to load studios'
      );
    }
  }
);

export const loadStudioByIdThunk = createAsyncThunk(
  `${STUDIOS_SLICE_NAME}/loadStudio`,
  async (studioId, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await API.getStudioById(studioId);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.[0]?.title ||
          error.message ||
          'Failed to load studio'
      );
    }
  }
);

const studiosSlice = createSlice({
  initialState,
  name: STUDIOS_SLICE_NAME,
  reducers: {
    clearCurrentStudio: state => {
      state.currentStudio = null;
    },
  },
  extraReducers: builder => {
    builder
      // create
      .addCase(createStudioThunk.pending, state => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(createStudioThunk.fulfilled, state => {
        state.isFetching = false;
      })
      .addCase(createStudioThunk.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.error = payload;
      })
      // updateById
      .addCase(updateStudioThunk.pending, state => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(updateStudioThunk.fulfilled, state => {
        state.isFetching = false;
      })
      .addCase(updateStudioThunk.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.error = payload;
      })
      // deleteById
      .addCase(deleteStudioThunk.pending, state => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(deleteStudioThunk.fulfilled, state => {
        state.isFetching = false;
      })
      .addCase(deleteStudioThunk.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.error = payload;
      })
      // get
      .addCase(loadStudiosThunk.pending, state => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(
        loadStudiosThunk.fulfilled,
        (state, { payload: { data, pagination } }) => {
          state.studios = data;
          state.pagination = pagination;
          state.isFetching = false;
        }
      )
      .addCase(loadStudiosThunk.rejected, (state, { payload: data }) => {
        state.error = data;
        state.isFetching = false;
      })
      // getById
      .addCase(loadStudioByIdThunk.pending, state => {
        state.isFetching = true;
        state.error = null;
        state.currentStudio = null;
      })
      .addCase(loadStudioByIdThunk.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.currentStudio = payload;
      })
      .addCase(loadStudioByIdThunk.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.error = payload;
      });
  },
});

const { reducer, actions } = studiosSlice;

export const { clearCurrentStudio } = actions;

export default reducer;
