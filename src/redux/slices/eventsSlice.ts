import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { RootState } from '../store';

interface IFetchEvents {
  search: string;
  type: string;
  date: string;
}
export interface IEventsState {
  events: {
    name: string;
    type: string;
    description: string;
    date: string;
    publicationDate: string;
    whoPublished: string;
    link: string;
    id: number;
  }[];
  pastEvents: {
    name: string;
    type: string;
    description: string;
    date: string;
    publicationDate: string;
    whoPublished: string;
    link: string;
    id: number;
  }[];
  statusEvents: string;
  statusPastEvents: string;
}

export const fetchEvents = createAsyncThunk(
  'events/fetchEventsStatus',
  async ({ search, type, date }: IFetchEvents) => {
    const { data } = await axios.get(`/events?${type}${search}${date}`);

    const getDate = () => {
      let now = new Date();
      let time = now.getTime();
      now = new Date(time - (time % 86400000));
      const fMonth = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
      const date = now.getFullYear() + '-' + fMonth[now.getMonth()] + '-' + now.getDate();

      return date;
    };

    let events = [];
    for (let i = 0; i < data.length; i++) {
      if (new Date(getDate()) < new Date(data[i].date.split('-').reverse().join('-'))) {
        events.push(data[i]);
      }
    }

    events.sort(function (a, b) {
      let dateA: any = new Date(a.date.split('-').reverse().join('-')),
        dateB: any = new Date(b.date.split('-').reverse().join('-'));
      return dateA - dateB;
    });

    return events;
  },
);

export const fetchPastEvents = createAsyncThunk(
  'pastEvents/fetchPastEventsStatus',
  async ({ search, type, date }: IFetchEvents) => {
    const { data } = await axios.get(`/events?${type}${search}${date}`);

    const getDate = () => {
      let now = new Date();
      let time = now.getTime();
      now = new Date(time - (time % 86400000));
      const fMonth = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
      const date = now.getFullYear() + '-' + fMonth[now.getMonth()] + '-' + now.getDate();

      return date;
    };

    let events = [];
    for (let i = 0; i < data.length; i++) {
      if (new Date(getDate()) > new Date(data[i].date.split('-').reverse().join('-'))) {
        events.push(data[i]);
      }
    }

    events.sort(function (a, b) {
      let dateA: any = new Date(a.date.split('-').reverse().join('-')),
        dateB: any = new Date(b.date.split('-').reverse().join('-'));
      return dateA - dateB;
    });

    return events;
  },
);

const initialState: IEventsState = {
  events: [],
  pastEvents: [],
  statusEvents: 'loading',
  statusPastEvents: 'loading',
};

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents(state, action) {
      state.events = action.payload;
    },
    removeEvent(state, action) {
      state.events = state.events.filter((item) => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEvents.pending, (state) => {
      state.statusEvents = 'loading';
      state.events = [];
    });
    builder.addCase(fetchEvents.fulfilled, (state, action) => {
      state.events = action.payload;
      state.statusEvents = 'successful';
    });
    builder.addCase(fetchEvents.rejected, (state) => {
      state.statusEvents = 'error';
      state.events = [];
      console.log('ОШИБКА');
    });

    builder.addCase(fetchPastEvents.pending, (state) => {
      state.statusPastEvents = 'loading';
      state.pastEvents = [];
    });
    builder.addCase(fetchPastEvents.fulfilled, (state, action) => {
      state.pastEvents = action.payload;
      state.statusPastEvents = 'successful';
    });
    builder.addCase(fetchPastEvents.rejected, (state) => {
      state.statusPastEvents = 'error';
      state.pastEvents = [];
      console.log('ОШИБКА');
    });
  },
});

export const eventsSelector = (state: RootState) => state.events;

export const { setEvents, removeEvent } = eventsSlice.actions;

export default eventsSlice.reducer;
