import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  studios: [
    {
      id: uuidv4(),
      name: 'Warner Bros. Pictures',
      country: 'USA',
      founded: 1923,
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKjUsWV5bfTnNebkW8x-TWwAQK7dNtRlhzOe6_021VSQ&s=10',
      description: 'An American company',
    },
  ],
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
    deleteStudio: (state, { payload }) => {
      state.studios = state.studios.filter(s => s.id !== payload);
    },
  },
});

const { reducer, actions } = studiosSlice;

export const { addStudio, deleteStudio } = actions;

export default reducer;
