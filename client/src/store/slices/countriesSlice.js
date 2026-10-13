import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import * as API from '../../api';

const COUNTRIES_SLICE_NAME = 'countries';

const initialState = {
  countries: [],
  isFetching: false,
  error: null,
};

export const selectCountries = state => state.countries.countries;
export const selectCountriesById = createSelector(
  [selectCountries],
  countries =>
    Object.fromEntries(
      countries.map(({ id, countryName }) => [id, countryName])
    )
);

export const loadCountriesThunk = createAsyncThunk(
  `${COUNTRIES_SLICE_NAME}/loadCountries`,
  async (_, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await API.getCountries();

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.[0]?.title ||
          error.message ||
          'Failed to load countries'
      );
    }
  }
);

const countriesSlice = createSlice({
  initialState,
  name: COUNTRIES_SLICE_NAME,
  extraReducers: buidler => {
    buidler
      .addCase(loadCountriesThunk.pending, state => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(loadCountriesThunk.fulfilled, (state, { payload }) => {
        state.countries = payload;
        state.isFetching = false;
      })
      .addCase(loadCountriesThunk.rejected, (state, { payload }) => {
        state.error = payload;
        state.isFetching = false;
      });
  },
});

const { reducer } = countriesSlice;

export default reducer;
