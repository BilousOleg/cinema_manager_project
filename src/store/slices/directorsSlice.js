import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  directors: [
    {
      id: 1,
      fullName: 'Christopher Nolan',
      birthDate: '1970-07-30',
      country: 'United Kingdom',
      photo:
        'https://upload.wikimedia.org/wikipedia/commons/9/95/Christopher_Nolan_Cannes_2018.jpg',
      biography:
        'British-American film director, producer and screenwriter. Known for large-scale science fiction and psychological thrillers.',
      movieIds: [1, 3, 5],
    },
    {
      id: 2,
      fullName: 'Todd Phillips',
      birthDate: '1970-12-20',
      country: 'USA',
      photo:
        'https://upload.wikimedia.org/wikipedia/commons/0/0b/Todd_Phillips-64847.jpg',
      biography:
        'American film director, producer and screenwriter. Best known for Joker and The Hangover trilogy.',
      movieIds: [2],
    },
    {
      id: 3,
      fullName: 'The Wachowskis',
      birthDate: '1965-06-21',
      country: 'USA',
      photo:
        'https://upload.wikimedia.org/wikipedia/commons/5/55/Lana_Wachowski-2787_%283x4_cropped%29.jpg',
      biography:
        'American filmmakers best known for creating The Matrix franchise.',
      movieIds: [4],
    },
  ],
};

const directorsSlice = createSlice({
  initialState,
  name: 'directors',
  reducers: {
    addDirectors: (state, action) => {},
  },
});

const { reducer, actions } = directorsSlice;

export default reducer;
