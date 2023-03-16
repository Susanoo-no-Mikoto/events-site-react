import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface ILoginState {
  dataUser: {
    accessToken: string;
    user: { id: number; name: string; surname: string; access: string; email: string };
  } | null;
  loginOpened: boolean;
}

const localStorageUser = localStorage.getItem('dataUser');

const initialState: ILoginState = {
  dataUser: localStorageUser && JSON.parse(localStorageUser),
  loginOpened: false,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLoginOpened(state, action) {
      state.loginOpened = false;
      state.loginOpened = action.payload;
    },
    setUser(state, action) {
      state.dataUser = action.payload;
    },
  },
});

export const loginSelector = (state: RootState) => state.login;

export const { setLoginOpened, setUser } = loginSlice.actions;

export default loginSlice.reducer;
