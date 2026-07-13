import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  entity: null,
  mode: null,
  selectedId: null,
};

const serviceSlice = createSlice({
  initialState,
  name: 'service',
  reducers: {
    toggleService: state => {
      state.isOpen = !state.isOpen;
    },
  },
});

const { reducer, actions } = serviceSlice;

export const { toggleService } = actions;

export default reducer;
