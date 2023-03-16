import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { RootState } from '../store';

interface IFetchEvents {
  upcomingDate?: string;
  pastDate?: string;
}

export const fetchUpcomingEvents = createAsyncThunk(
  'upcomingEvents/fetchUpcomingEventsStatus',
  async ({ upcomingDate }: IFetchEvents) => {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();
    const fMonth = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const currDate = `&date=${day + '-' + fMonth[month] + '-' + year}`;
    const { data } = await axios.get(`/events?${upcomingDate ? upcomingDate : currDate}`);

    return data;
  },
);

export const fetchPastEvents = createAsyncThunk(
  'PastEvents/fetchPastEventsStatus',
  async ({ pastDate }: IFetchEvents) => {
    const now = new Date();
    const day = now.getDate() - 1;
    const month = now.getMonth();
    const year = now.getFullYear();
    const fMonth = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const currDate = `&date=${day + '-' + fMonth[month] + '-' + year}`;
    const { data } = await axios.get(`/events?${pastDate ? pastDate : currDate}`);

    return data;
  },
);

export interface IHomeState {
  upcomingEvents: {
    name: string;
    type: string;
    description: string;
    date: string;
    publicationDate: string;
    whoPublished: string;
    id: number;
  }[];
  pastEvents: {
    name: string;
    type: string;
    description: string;
    date: string;
    publicationDate: string;
    whoPublished: string;
    id: number;
  }[];
  upcomingDateId: number;
  pastDateId: number;
  upcomingDateValue: string;
  pastDateValue: string;
  upcomingStatus: string;
  pastStatus: string;
}

const initialState: IHomeState = {
  upcomingEvents: [],
  pastEvents: [],
  upcomingDateId: 0,
  pastDateId: 0,
  upcomingDateValue: '',
  pastDateValue: '',
  upcomingStatus: 'loading',
  pastStatus: 'loading',
};

export const homeEventsSlice = createSlice({
  name: 'homeEvents',
  initialState,
  reducers: {
    setUpcomingEvents(state, action) {
      state.upcomingEvents = action.payload;
    },
    setPastEvents(state, action) {
      state.pastEvents = action.payload;
    },
    setUpcomingDateId(state, action) {
      state.upcomingDateId = action.payload;
    },
    setPastDateId(state, action) {
      state.pastDateId = action.payload;
    },
    setUpcomingDateValue(state, action) {
      state.upcomingDateValue = action.payload;
    },
    setPastDateValue(state, action) {
      state.pastDateValue = action.payload;
    },
    setFilter(state, action) {
      state.upcomingDateValue = action.payload.upcomingDateValue;
      state.pastDateValue = action.payload.pastDateValue;
      state.upcomingDateId = action.payload.upcomingDateId;
      state.pastDateId = action.payload.pastDateId;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUpcomingEvents.pending, (state) => {
      state.upcomingStatus = 'loading';
      state.upcomingEvents = [];
    });
    builder.addCase(fetchUpcomingEvents.fulfilled, (state, action) => {
      state.upcomingEvents = action.payload;
      state.upcomingStatus = 'successful';
    });
    builder.addCase(fetchUpcomingEvents.rejected, (state) => {
      state.upcomingStatus = 'error';
      state.upcomingEvents = [];
      console.log('ОШИБКА');
    });
    builder.addCase(fetchPastEvents.pending, (state) => {
      state.pastStatus = 'loading';
      state.pastEvents = [];
    });
    builder.addCase(fetchPastEvents.fulfilled, (state, action) => {
      state.pastEvents = action.payload;
      state.pastStatus = 'successful';
    });
    builder.addCase(fetchPastEvents.rejected, (state) => {
      state.pastStatus = 'error';
      state.pastEvents = [];
      console.log('ОШИБКА');
    });
  },
});

export const homeEventsSelector = (state: RootState) => state.home;

export const {
  setUpcomingEvents,
  setPastEvents,
  setUpcomingDateId,
  setPastDateId,
  setUpcomingDateValue,
  setPastDateValue,
  setFilter,
} = homeEventsSlice.actions;

export default homeEventsSlice.reducer;
