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
    openService: state => {
      state.isOpen = true;
    },

    closeService: state => {
      state.isOpen = false;
      state.entity = null;
      state.mode = null;
      state.selectedId = null;
    },

    openEntityForm: (state, { payload: { entity, mode, selectedId } }) => {
      state.isOpen = true;
      state.entity = entity;
      state.mode = mode;
      state.selectedId = selectedId ?? null;
    },
  },
});

const { reducer, actions } = serviceSlice;

export const { openService, closeService, openEntityForm } = actions;

export default reducer;
