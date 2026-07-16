import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  actors: [
    {
      id: uuidv4(),
      fullName: 'Matthew McConaughey',
      birthDate: '1969-11-04',
      country: 'USA',
      photo:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqfu-8n0ljUW4HAw5VtBpUkxB09VQ3SjoG4i3rDdk1WQsCfl8PMftbeakmk-hrYbDyA9YrFQ5lm7s0QVxg_VxAk9mvx9HXA_7iXsMqFww&s=10',
      biography: 'Academy Award-winning American actor.',
    },
  ],
};

const actorsSlice = createSlice({
  initialState,
  name: 'actors',
  reducers: {
    addActor: (state, action) => {},
    deleteActor: (state, { payload }) => {
      state.actors = state.actors.filter(a => a.id !== payload);
    },
  },
});

const { reducer, actions } = actorsSlice;

export const { deleteActor } = actions;

export default reducer;
