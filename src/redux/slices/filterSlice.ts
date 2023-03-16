import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface IFilterState {
  searchValue: string;
  typeId: number;
  dateValue: string;
}

const initialState: IFilterState = {
  searchValue: '',
  typeId: 0,
  dateValue: '',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setTypeId(state, action) {
      state.typeId = action.payload;
    },
    setDateValue(state, action) {
      state.dateValue = action.payload;
    },
    setFilters(state, action) {
      state.typeId = action.payload.typeId;
    },
  },
});

export const filterSelector = (state: RootState) => state.filter;

export const { setSearchValue, setTypeId, setDateValue, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
