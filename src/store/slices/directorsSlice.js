import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  directors: [
    {
      id: uuidv4(),
      fullName: 'Christopher Nolan',
      birthDate: '1970-07-30',
      country: 'United Kingdom',
      photo:
        'https://upload.wikimedia.org/wikipedia/commons/9/95/Christopher_Nolan_Cannes_2018.jpg',
      biography:
        'British-American film director, producer and screenwriter. Known for large-scale science fiction and psychological thrillers.',
    },
  ],
};

const directorsSlice = createSlice({
  initialState,
  name: 'directors',
  reducers: {
    addDirector: (state, action) => {},
    deleteDirector: (state, { payload }) => {
      state.directors = state.directors.filter(a => a.id !== payload);
    },
  },
});

const { reducer, actions } = directorsSlice;

export const { deleteDirector } = actions;

export default reducer;
