import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { RootState } from '../store';

interface IFetchUpcomingEvents {
  upcomingDate: string;
}

interface IFetchPastEvents {
  pastDate: string;
}

export const fetchEvents = createAsyncThunk('events/fetchEventsStatus', async () => {
  const { data } = await axios.get(`/events`);

  return data;
});

export const fetchUpcomingEvents = createAsyncThunk(
  'upcomingEvents/fetchUpcomingEventsStatus',
  async ({ upcomingDate }: IFetchUpcomingEvents) => {
    // const now = new Date();
    // const day = now.getDate();
    // const month = now.getMonth();
    // const year = now.getFullYear();
    // const fMonth = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    // const currDate = `&date=${day + '-' + fMonth[month] + '-' + year}`;
    const { data } = await axios.get(`/events?${upcomingDate /*: currDate*/}`);

    return data;
  },
);

export const fetchPastEvents = createAsyncThunk(
  'PastEvents/fetchPastEventsStatus',
  async ({ pastDate }: IFetchPastEvents) => {
    // const now = new Date();
    // const day = now.getDate() - 1;
    // const month = now.getMonth();
    // const year = now.getFullYear();
    // const fMonth = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    // const currDate = `&date=${day + '-' + fMonth[month] + '-' + year}`;
    const { data } = await axios.get(`/events?${pastDate /*: currDate*/}`);

    return data;
  },
);

export interface IHomeState {
  events: {
    name: string;
    type: string;
    description: string;
    date: string;
    publicationDate: string;
    whoPublished: string;
    id: number;
  }[];
  eventsStatus: string;

  upcomingEvents: {
    name: string;
    type: string;
    description: string;
    date: string;
    publicationDate: string;
    whoPublished: string;
    id: number;
  }[];
  upcomingStatus: string;
  upcomingDateId: number;
  upcomingDateValue: string;

  pastEvents: {
    name: string;
    type: string;
    description: string;
    date: string;
    publicationDate: string;
    whoPublished: string;
    id: number;
  }[];
  pastStatus: string;
  pastDateId: number;
  pastDateValue: string;
}

const initialState: IHomeState = {
  events: [],
  eventsStatus: 'loading',

  upcomingEvents: [],
  upcomingStatus: 'loading',
  upcomingDateId: 0,
  upcomingDateValue: '',

  pastEvents: [],
  pastStatus: 'loading',
  pastDateId: 0,
  pastDateValue: '',
};

export const homeEventsSlice = createSlice({
  name: 'homeEvents',
  initialState,
  reducers: {
    setEvents(state, action) {
      state.events = action.payload;
    },
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
    builder.addCase(fetchEvents.pending, (state) => {
      state.eventsStatus = 'loading';
      //state.events = [];
    });
    builder.addCase(fetchEvents.fulfilled, (state, action) => {
      state.events = action.payload;
      state.eventsStatus = 'successful';
    });
    builder.addCase(fetchEvents.rejected, (state) => {
      state.eventsStatus = 'error';
      //state.events = [];
      console.log('ОШИБКА');
    });
    builder.addCase(fetchUpcomingEvents.pending, (state) => {
      state.upcomingStatus = 'loading';
      //state.upcomingEvents = [];
    });
    builder.addCase(fetchUpcomingEvents.fulfilled, (state, action) => {
      state.upcomingEvents = action.payload;
      state.upcomingStatus = 'successful';
    });
    builder.addCase(fetchUpcomingEvents.rejected, (state) => {
      state.upcomingStatus = 'error';
      //state.upcomingEvents = [];
      console.log('ОШИБКА');
    });
    builder.addCase(fetchPastEvents.pending, (state) => {
      state.pastStatus = 'loading';
      //state.pastEvents = [];
    });
    builder.addCase(fetchPastEvents.fulfilled, (state, action) => {
      state.pastEvents = action.payload;
      state.pastStatus = 'successful';
    });
    builder.addCase(fetchPastEvents.rejected, (state) => {
      state.pastStatus = 'error';
      //state.pastEvents = [];
      console.log('ОШИБКА');
    });
  },
});

export const homeEventsSelector = (state: RootState) => state.home;

export const {
  setEvents,
  setUpcomingEvents,
  setPastEvents,
  setUpcomingDateId,
  setPastDateId,
  setUpcomingDateValue,
  setPastDateValue,
  setFilter,
} = homeEventsSlice.actions;

export default homeEventsSlice.reducer;
