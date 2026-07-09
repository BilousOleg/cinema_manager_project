import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  studios: [
    {
      id: 1,
      name: 'Warner Bros. Pictures',
      country: 'USA',
      founded: 1923,
      logo: 'https://upload.wikimedia.org/wikipedia/commons/6/66/Warner_Bros._Pictures_logo.svg',
      movieIds: [1, 5],
    },
    {
      id: 2,
      name: 'DC Films',
      country: 'USA',
      founded: 2016,
      logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/DC_Films_logo.svg',
      movieIds: [2],
    },
    {
      id: 3,
      name: 'Universal Pictures',
      country: 'USA',
      founded: 1912,
      logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Universal_Pictures_logo.svg',
      movieIds: [3],
    },
    {
      id: 4,
      name: 'Village Roadshow Pictures',
      country: 'Australia',
      founded: 1986,
      logo: 'https://upload.wikimedia.org/wikipedia/en/3/31/Village_Roadshow_Pictures_logo.svg',
      movieIds: [4],
    },
  ],
};

const studiosSlice = createSlice({
  initialState,
  name: 'studios',
  reducers: {},
});

const { reducer, actions } = studiosSlice;

export default reducer;
