import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  studios: [],
};

const studiosSlice = createSlice({
  initialState,
  name: 'studios',
  reducers: {
    addStudio: (state, { payload }) => {
      state.studios.push({
        id: uuidv4(),
        ...payload,
      });
    },
    updateStudio: (state, { payload }) => {
      const studio = state.studios.find(s => s.id === payload.id);

      if (studio) {
        Object.assign(studio, payload);
      }
    },
    deleteStudio: (state, { payload }) => {
      state.studios = state.studios.filter(s => s.id !== payload);
    },
  },
});

const { reducer, actions } = studiosSlice;

export const { addStudio, updateStudio, deleteStudio } = actions;

export default reducer;
