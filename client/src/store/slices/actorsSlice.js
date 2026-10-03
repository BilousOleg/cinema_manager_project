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
  isFetching: false,
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
      const actors = API.getStoredEntities(ACTORS);
      const isActorExists = actors.some(a => a.id === actorId);

      if (!isActorExists) {
        throw new Error('Actor not found');
      }

      const updatedActors = actors.filter(a => a.id !== actorId);
      API.setStoredEntities(ACTORS, updatedActors);

      return actorId;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete actor');
    }
  }
);

export const loadActorsThunk = createAsyncThunk(
  `${ACTORS_SLICE_NAME}/loadActors`,
  async (_, { rejectWithValue }) => {
    try {
      const actors = API.getStoredEntities(ACTORS);

      return actors;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to load actors');
    }
  }
);

const actorsSlice = createSlice({
  initialState,
  name: ACTORS_SLICE_NAME,
  reducers: {},
  extraReducers: builder => {
    builder
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
      .addCase(loadActorsThunk.pending, state => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(loadActorsThunk.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.actors = payload;
      })
      .addCase(loadActorsThunk.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.error = payload;
      });
  },
});

const { reducer } = actorsSlice;

export default reducer;
