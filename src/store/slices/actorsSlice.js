import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  actors: [],
};

const actorsSlice = createSlice({
  initialState,
  name: 'actors',
  reducers: {
    addActor: (state, { payload }) => {
      state.actors.push({
        id: uuidv4(),
        ...payload,
      });
    },
    updateActor: (state, { payload }) => {
      const actor = state.actors.find(a => a.id === payload.id);

      if (actor) {
        Object.assign(actor, payload);
      }
    },
    deleteActor: (state, { payload }) => {
      state.actors = state.actors.filter(a => a.id !== payload);
    },
  },
});

const { reducer, actions } = actorsSlice;

export const { addActor, updateActor, deleteActor } = actions;

export default reducer;
