import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { RootState } from '../store';

interface IFetchEvents {
  search: string;
  type: string;
  date: string;
}

export const fetchEvents = createAsyncThunk(
  'events/fetchEventsStatus',
  async ({ search, type, date }: IFetchEvents) => {
    const { data } = await axios.get(`/events?${type}${search}${date}`);

    return data;
  },
);

export interface IEventsState {
  events: {
    name: string;
    type: string;
    description: string;
    date: string;
    publicationDate: string;
    whoPublished: string;
    id: number;
  }[];
  status: string;
}

const initialState: IEventsState = { events: [], status: 'loading' };

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents(state, action) {
      state.events = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEvents.pending, (state) => {
      state.status = 'loading';
      state.events = [];
    });
    builder.addCase(fetchEvents.fulfilled, (state, action) => {
      state.events = action.payload;
      state.status = 'successful';
    });
    builder.addCase(fetchEvents.rejected, (state) => {
      state.status = 'error';
      state.events = [];
      console.log('ОШИБКА');
    });
  },
});

export const eventsSelector = (state: RootState) => state.events;

export const { setEvents } = eventsSlice.actions;

export default eventsSlice.reducer;
