import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface IFilterState {
  searchValue: string;
  value: string;
  typeId: number;
  dateValue: string;
  inputDateValue: string;
}

const initialState: IFilterState = {
  searchValue: '',
  value: '',
  typeId: 0,
  dateValue: '',
  inputDateValue: '',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setValue(state, action) {
      state.value = action.payload;
    },
    setTypeId(state, action) {
      state.typeId = action.payload;
    },
    setDateValue(state, action) {
      state.dateValue = action.payload;
    },
    setInputDateValue(state, action) {
      state.inputDateValue = action.payload;
    },
    setFilters(state, action) {
      state.typeId = action.payload.typeId;
    },
  },
});

export const filterSelector = (state: RootState) => state.filter;

export const { setSearchValue, setValue, setTypeId, setDateValue, setInputDateValue, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
