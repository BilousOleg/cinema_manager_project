import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as API from './../../api';
import { normalizeFormValues } from '../../utils/formValues';
import CONSTANTS from '../../constants';

const {
  STORAGE_KEYS: { ACTORS },
} = CONSTANTS;

const ACTORS_SLICE_NAME = 'actors';

const initialState = {
  actors: [],
  currentActor: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
  isFetching: true,
  error: null,
};

export const createActorThunk = createAsyncThunk(
  `${ACTORS_SLICE_NAME}/addActor`,
  async (actor, { rejectWithValue }) => {
    try {
      const normalizedActor = normalizeFormValues(actor);

      const {
        data: { data },
      } = await API.createActor(normalizedActor);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.errors?.[0]?.title ||
          error.message ||
          'Failed to add actor'
      );
    }
  }
);

export const updateActorThunk = createAsyncThunk(
  `${ACTORS_SLICE_NAME}/updateActor`,
  async ({ id, actor }, { rejectWithValue }) => {
    try {
      const normalizedActor = normalizeFormValues(actor);

      const {
        data: { data },
      } = await API.updateActorById(id, normalizedActor);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.errors?.[0]?.title ||
          error.message ||
          'Failed to update actor'
      );
    }
  }
);

export const deleteActorThunk = createAsyncThunk(
  `${ACTORS_SLICE_NAME}/deleteActor`,
  async (actorId, { rejectWithValue }) => {
    try {
      await API.deleteActorById(actorId);

      return actorId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.errors?.[0]?.title ||
          error.message ||
          'Failed to delete actor'
      );
    }
  }
);

export const loadActorsThunk = createAsyncThunk(
  `${ACTORS_SLICE_NAME}/loadActors`,
  async (params, { rejectWithValue }) => {
    try {
      const {
        data: { data, pagination },
      } = await API.getActors(params);

      return { data, pagination };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.errors?.[0]?.title ||
          error.message ||
          'Failed to load actors'
      );
    }
  }
);

export const loadActorByIdThunk = createAsyncThunk(
  `${ACTORS_SLICE_NAME}/loadActor`,
  async (actorId, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await API.getActorById(actorId);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.errors?.[0]?.title ||
          error.message ||
          'Failed to load actor'
      );
    }
  }
);

const actorsSlice = createSlice({
  initialState,
  name: ACTORS_SLICE_NAME,
  reducers: {
    clearCurrentActor: state => {
      state.currentActor = null;
    },
  },
  extraReducers: builder => {
    builder
      // create
      .addCase(createActorThunk.pending, state => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(createActorThunk.fulfilled, state => {
        state.isFetching = false;
      })
      .addCase(createActorThunk.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.error = payload;
      })
      // updateById
      .addCase(updateActorThunk.pending, state => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(updateActorThunk.fulfilled, state => {
        state.isFetching = false;
      })
      .addCase(updateActorThunk.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.error = payload;
      })
      // deleteById
      .addCase(deleteActorThunk.pending, state => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(deleteActorThunk.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.actors = state.actors.filter(a => a.id !== payload);
      })
      .addCase(deleteActorThunk.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.error = payload;
      })
      // get
      .addCase(loadActorsThunk.pending, state => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(
        loadActorsThunk.fulfilled,
        (state, { payload: { data, pagination } }) => {
          state.actors = data;
          state.pagination = pagination;
          state.isFetching = false;
        }
      )
      .addCase(loadActorsThunk.rejected, (state, { payload: { data } }) => {
        state.error = data;
        state.isFetching = false;
      })
      // getById
      .addCase(loadActorByIdThunk.pending, state => {
        state.isFetching = true;
        state.error = null;
        state.currentActor = null;
      })
      .addCase(loadActorByIdThunk.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.currentActor = payload;
      })
      .addCase(loadActorByIdThunk.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.error = payload;
      });
  },
});

const { reducer, actions } = actorsSlice;

export const { clearCurrentActor } = actions;

export default reducer;
