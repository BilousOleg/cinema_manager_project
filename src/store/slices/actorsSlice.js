import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  actors: [
    {
      id: 1,
      fullName: 'Matthew McConaughey',
      birthDate: '1969-11-04',
      country: 'USA',
      photo:
        'https://upload.wikimedia.org/wikipedia/commons/8/8b/Matthew_McConaughey_2019.jpg',
      biography: 'Academy Award-winning American actor.',
      movieIds: [1],
    },
    {
      id: 2,
      fullName: 'Anne Hathaway',
      birthDate: '1982-11-12',
      country: 'USA',
      photo:
        'https://upload.wikimedia.org/wikipedia/commons/9/96/Anne_Hathaway_2017.jpg',
      biography: 'American actress and Academy Award winner.',
      movieIds: [1],
    },
    {
      id: 3,
      fullName: 'Jessica Chastain',
      birthDate: '1977-03-24',
      country: 'USA',
      photo:
        'https://upload.wikimedia.org/wikipedia/commons/6/66/Jessica_Chastain_2015.jpg',
      biography: 'American actress and producer.',
      movieIds: [1],
    },
    {
      id: 4,
      fullName: 'Joaquin Phoenix',
      birthDate: '1974-10-28',
      country: 'USA',
      photo:
        'https://upload.wikimedia.org/wikipedia/commons/8/83/Joaquin_Phoenix_Cannes_2017.jpg',
      biography: 'American actor known for intense dramatic roles.',
      movieIds: [2],
    },
    {
      id: 5,
      fullName: 'Cillian Murphy',
      birthDate: '1976-05-25',
      country: 'Ireland',
      photo:
        'https://upload.wikimedia.org/wikipedia/commons/7/74/Cillian_Murphy_2014.jpg',
      biography: 'Irish actor known for Oppenheimer and Peaky Blinders.',
      movieIds: [3],
    },
    {
      id: 6,
      fullName: 'Emily Blunt',
      birthDate: '1983-02-23',
      country: 'United Kingdom',
      photo:
        'https://upload.wikimedia.org/wikipedia/commons/4/43/Emily_Blunt_2015.jpg',
      biography: 'British actress.',
      movieIds: [3],
    },
    {
      id: 7,
      fullName: 'Keanu Reeves',
      birthDate: '1964-09-02',
      country: 'Canada',
      photo:
        'https://upload.wikimedia.org/wikipedia/commons/6/6b/Keanu_Reeves_2019.jpg',
      biography: 'Canadian actor best known for The Matrix and John Wick.',
      movieIds: [4],
    },
    {
      id: 8,
      fullName: 'Laurence Fishburne',
      birthDate: '1961-07-30',
      country: 'USA',
      photo:
        'https://upload.wikimedia.org/wikipedia/commons/2/2d/Laurence_Fishburne_2015.jpg',
      biography: 'American actor and producer.',
      movieIds: [4],
    },
    {
      id: 9,
      fullName: 'Leonardo DiCaprio',
      birthDate: '1974-11-11',
      country: 'USA',
      photo:
        'https://upload.wikimedia.org/wikipedia/commons/4/46/Leonardo_DiCaprio_Cannes_2019.jpg',
      biography: 'Academy Award-winning American actor and producer.',
      movieIds: [5],
    },
    {
      id: 10,
      fullName: 'Joseph Gordon-Levitt',
      birthDate: '1981-02-17',
      country: 'USA',
      photo:
        'https://upload.wikimedia.org/wikipedia/commons/0/07/Joseph_Gordon-Levitt_2013.jpg',
      biography: 'American actor and filmmaker.',
      movieIds: [5],
    },
  ],
};

const actorsSlice = createSlice({
  initialState,
  name: 'actors',
  reducers: {
    addActors: (state, action) => {},
  },
});

const { reducer, actions } = actorsSlice;

export default reducer;
