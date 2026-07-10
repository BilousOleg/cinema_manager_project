import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  studios: [
    {
      id: 1,
      name: 'Warner Bros. Pictures',
      country: 'USA',
      founded: 1923,
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKjUsWV5bfTnNebkW8x-TWwAQK7dNtRlhzOe6_021VSQ&s=10',
      movieIds: [1, 5],
    },
    {
      id: 2,
      name: 'DC Films',
      country: 'USA',
      founded: 2016,
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPkOI-5VPQTphP8ywCHIE7HiT1gzDtz-SjNZrHyDhR8A&s',
      movieIds: [2],
    },
    {
      id: 3,
      name: 'Universal Pictures',
      country: 'USA',
      founded: 1912,
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCDjUYCMWCJvYgNi5GPXrAo-iX3n5VnbG7vIEZFwSl3Q&s',
      movieIds: [3],
    },
    {
      id: 4,
      name: 'Village Roadshow Pictures',
      country: 'Australia',
      founded: 1986,
      logo: 'https://i0.wp.com/www.thewrap.com/wp-content/uploads/2017/04/village-roadshow-logo.jpg?fit=618%2C412&quality=89&ssl=1',
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
