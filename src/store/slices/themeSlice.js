import { createSlice } from '@reduxjs/toolkit';
import CONSTANTS from '../../constants';

const {
  STORAGE_KEYS: { THEME },
  THEMES: { DARK, LIGHT },
} = CONSTANTS;

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem(THEME);

  return savedTheme === LIGHT || savedTheme === DARK ? savedTheme : DARK;
};

const initialState = {
  theme: getInitialTheme(),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: state => {
      state.theme = state.theme === DARK ? LIGHT : DARK;
      localStorage.setItem(THEME, state.theme);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
