import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  directors: [
    {
      id: uuidv4(),
      firstName: 'Christopher',
      lastName: 'Nolan',
      birthDate: '1970-07-30',
      country: 'United Kingdom',
      photo:
        'https://upload.wikimedia.org/wikipedia/commons/9/95/Christopher_Nolan_Cannes_2018.jpg',
      biography:
        'British-American film director, producer and screenwriter. Known for large-scale science fiction and psychological thrillers.',
    },
    {
      id: uuidv4(),
      firstName: 'Todd',
      lastName: 'Phillips',
      birthDate: '1970-12-20',
      country: 'USA',
      photo:
        'https://upload.wikimedia.org/wikipedia/commons/0/0b/Todd_Phillips-64847.jpg',
      biography:
        'American film director, producer and screenwriter. Best known for Joker and The Hangover trilogy.',
    },
    {
      id: uuidv4(),
      firstName: 'The',
      lastName: 'Wachowskis',
      birthDate: '1965-06-21',
      country: 'USA',
      photo:
        'https://upload.wikimedia.org/wikipedia/commons/5/55/Lana_Wachowski-2787_%283x4_cropped%29.jpg',
      biography:
        'American filmmakers best known for creating The Matrix franchise.',
    },
    {
      id: uuidv4(),
      firstName: 'Christopher',
      lastName: 'Nolan',
      birthDate: '1970-07-30',
      country: 'United Kingdom',
      photo:
        'https://upload.wikimedia.org/wikipedia/commons/9/95/Christopher_Nolan_Cannes_2018.jpg',
      biography:
        'British-American film director, producer and screenwriter. Known for large-scale science fiction and psychological thrillers.',
    },
    {
      id: uuidv4(),
      firstName: 'Todd',
      lastName: 'Phillips',
      birthDate: '1970-12-20',
      country: 'USA',
      photo:
        'https://upload.wikimedia.org/wikipedia/commons/0/0b/Todd_Phillips-64847.jpg',
      biography:
        'American film director, producer and screenwriter. Best known for Joker and The Hangover trilogy.',
    },
    {
      id: uuidv4(),
      firstName: 'The',
      lastName: 'Wachowskis',
      birthDate: '1965-06-21',
      country: 'USA',
      photo:
        'https://upload.wikimedia.org/wikipedia/commons/5/55/Lana_Wachowski-2787_%283x4_cropped%29.jpg',
      biography:
        'American filmmakers best known for creating The Matrix franchise.',
    },
    {
      id: uuidv4(),
      firstName: 'Christopher',
      lastName: 'Nolan',
      birthDate: '1970-07-30',
      country: 'United Kingdom',
      photo:
        'https://upload.wikimedia.org/wikipedia/commons/9/95/Christopher_Nolan_Cannes_2018.jpg',
      biography:
        'British-American film director, producer and screenwriter. Known for large-scale science fiction and psychological thrillers.',
    },
    {
      id: uuidv4(),
      firstName: 'Todd',
      lastName: 'Phillips',
      birthDate: '1970-12-20',
      country: 'USA',
      photo:
        'https://upload.wikimedia.org/wikipedia/commons/0/0b/Todd_Phillips-64847.jpg',
      biography:
        'American film director, producer and screenwriter. Best known for Joker and The Hangover trilogy.',
    },
    {
      id: uuidv4(),
      firstName: 'The',
      lastName: 'Wachowskis',
      birthDate: '1965-06-21',
      country: 'USA',
      photo:
        'https://upload.wikimedia.org/wikipedia/commons/5/55/Lana_Wachowski-2787_%283x4_cropped%29.jpg',
      biography:
        'American filmmakers best known for creating The Matrix franchise.',
    },
  ],
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
