import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  entity: null,
  selectedId: null,
};

const serviceSlice = createSlice({
  initialState,
  name: 'service',
  reducers: {
    openService: state => {
      state.isOpen = true;
    },

    closeService: state => {
      state.isOpen = false;
      state.entity = null;
      state.selectedId = null;
    },

    openEntityForm: (state, { payload: { entity, selectedId } }) => {
      state.isOpen = true;
      state.entity = entity;
      state.selectedId = selectedId ?? null;
    },
  },
});

const { reducer, actions } = serviceSlice;

export const { openService, closeService, openEntityForm } = actions;

export default reducer;
