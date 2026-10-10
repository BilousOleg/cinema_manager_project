import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import * as API from './../../api';
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

export const addActorThunk = createAsyncThunk(
  `${ACTORS_SLICE_NAME}/addActor`,
  async (actor, { rejectWithValue }) => {
    try {
      const newActor = {
        id: uuidv4(),
        ...actor,
      };

      const actors = API.getStoredEntities(ACTORS);
      actors.push(newActor);
      API.setStoredEntities(ACTORS, actors);

      return newActor;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to add actor');
    }
  }
);

export const updateActorThunk = createAsyncThunk(
  `${ACTORS_SLICE_NAME}/updateActor`,
  async (actor, { rejectWithValue }) => {
    try {
      const actors = API.getStoredEntities(ACTORS);
      const storedActor = actors.find(a => a.id === actor.id);

      if (!storedActor) {
        throw new Error('Actor not found');
      }

      Object.assign(storedActor, actor);
      API.setStoredEntities(ACTORS, actors);

      return storedActor;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update actor');
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
      return rejectWithValue(error.message || 'Failed to delete actor');
    }
  }
);

export const loadActorsThunk = createAsyncThunk(
  `${ACTORS_SLICE_NAME}/loadActors`,
  async ({ page, results }, { rejectWithValue }) => {
    try {
      const {
        data: { data, pagination },
      } = await API.getActors(page, results);

      return { data, pagination };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to load actors');
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
      return rejectWithValue(error.message || 'Failed to load actor');
    }
  }
);

const actorsSlice = createSlice({
  initialState,
  name: ACTORS_SLICE_NAME,
  reducers: {},
  extraReducers: builder => {
    builder
      // create
      .addCase(addActorThunk.pending, state => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(addActorThunk.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.actors.push(payload);
      })
      .addCase(addActorThunk.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.error = payload;
      })
      // updateById
      .addCase(updateActorThunk.pending, state => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(updateActorThunk.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        const actor = state.actors.find(a => a.id === payload.id);

        if (actor) {
          Object.assign(actor, payload);
        }
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

const { reducer } = actorsSlice;

export default reducer;
