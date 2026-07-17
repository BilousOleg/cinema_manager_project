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
    deleteActor: (state, { payload }) => {
      state.actors = state.actors.filter(a => a.id !== payload);
    },
  },
});

const { reducer, actions } = actorsSlice;

export const { addActor, deleteActor } = actions;

export default reducer;
