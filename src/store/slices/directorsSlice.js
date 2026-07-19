import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  directors: [],
};

const directorsSlice = createSlice({
  initialState,
  name: 'directors',
  reducers: {
    addDirector: (state, { payload }) => {
      state.directors.push({
        id: uuidv4(),
        ...payload,
      });
    },
    updateDirector: (state, { payload }) => {
      const director = state.directors.find(d => d.id === payload.id);

      if (director) {
        Object.assign(director, payload);
      }
    },
    deleteDirector: (state, { payload }) => {
      state.directors = state.directors.filter(a => a.id !== payload);
    },
  },
});

const { reducer, actions } = directorsSlice;

export const { addDirector, updateDirector, deleteDirector } = actions;

export default reducer;
