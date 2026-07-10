import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  actors: [
    {
      id: 1,
      fullName: 'Matthew McConaughey',
      birthDate: '1969-11-04',
      country: 'USA',
      photo:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqfu-8n0ljUW4HAw5VtBpUkxB09VQ3SjoG4i3rDdk1WQsCfl8PMftbeakmk-hrYbDyA9YrFQ5lm7s0QVxg_VxAk9mvx9HXA_7iXsMqFww&s=10',
      biography: 'Academy Award-winning American actor.',
      movieIds: [1],
    },
    {
      id: 2,
      fullName: 'Anne Hathaway',
      birthDate: '1982-11-12',
      country: 'USA',
      photo:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Anne_Hathaway-_Press_conference_for_the_film_%22The_Devil_Wears_Prada_2%22_-_55194764955_%28cropped%29.jpg/960px-Anne_Hathaway-_Press_conference_for_the_film_%22The_Devil_Wears_Prada_2%22_-_55194764955_%28cropped%29.jpg',
      biography: 'American actress and Academy Award winner.',
      movieIds: [1],
    },
    {
      id: 3,
      fullName: 'Jessica Chastain',
      birthDate: '1977-03-24',
      country: 'USA',
      photo:
        'https://upload.wikimedia.org/wikipedia/commons/1/11/Jessica_Chastain-64631_%28cropped%29.jpg',
      biography: 'American actress and producer.',
      movieIds: [1],
    },
    {
      id: 4,
      fullName: 'Joaquin Phoenix',
      birthDate: '1974-10-28',
      country: 'USA',
      photo:
        'https://upload.wikimedia.org/wikipedia/commons/d/dc/Joaquin_Phoenix-64908_%28cropped%29.jpg',
      biography: 'American actor known for intense dramatic roles.',
      movieIds: [2],
    },
    {
      id: 5,
      fullName: 'Cillian Murphy',
      birthDate: '1976-05-25',
      country: 'Ireland',
      photo:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Cillian_Murphy-2014.jpg/250px-Cillian_Murphy-2014.jpg',
      biography: 'Irish actor known for Oppenheimer and Peaky Blinders.',
      movieIds: [3],
    },
    {
      id: 6,
      fullName: 'Emily Blunt',
      birthDate: '1983-02-23',
      country: 'United Kingdom',
      photo:
        'https://upload.wikimedia.org/wikipedia/commons/4/45/Emily_Blunt_at_WWD_Style_Awards_2026-02.jpg',
      biography: 'British actress.',
      movieIds: [3],
    },
    {
      id: 7,
      fullName: 'Keanu Reeves',
      birthDate: '1964-09-02',
      country: 'Canada',
      photo:
        'https://upload.wikimedia.org/wikipedia/commons/b/b4/Keanu_Reeves_at_TIFF_2025_02_%28Cropped%29.jpg',
      biography: 'Canadian actor best known for The Matrix and John Wick.',
      movieIds: [4],
    },
    {
      id: 8,
      fullName: 'Laurence Fishburne',
      birthDate: '1961-07-30',
      country: 'USA',
      photo:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Laurence_Fishburne_at_53rd_Saturn_Awards_2026.jpg/960px-Laurence_Fishburne_at_53rd_Saturn_Awards_2026.jpg',
      biography: 'American actor and producer.',
      movieIds: [4],
    },
    {
      id: 9,
      fullName: 'Leonardo DiCaprio',
      birthDate: '1974-11-11',
      country: 'USA',
      photo:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/LeoPTABFI191125-28_%28cropped%29.jpg/250px-LeoPTABFI191125-28_%28cropped%29.jpg',
      biography: 'Academy Award-winning American actor and producer.',
      movieIds: [5],
    },
    {
      id: 10,
      fullName: 'Joseph Gordon-Levitt',
      birthDate: '1981-02-17',
      country: 'USA',
      photo:
        'https://upload.wikimedia.org/wikipedia/commons/0/01/Joseph_Gordon_Levitt_Sundance_Film_Festival_2026_%28cropped%29.jpg',
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
