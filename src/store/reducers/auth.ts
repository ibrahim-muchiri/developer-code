import {createSlice} from '@reduxjs/toolkit';

export interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  currentUser: any;
}

const initialState: AuthState = {
  isLoggedIn: !!localStorage.getItem('accessToken'),
  token: localStorage.getItem('accessToken'),

};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state, {payload}) => {
      localStorage.setItem('accessToken', payload);
      state.isLoggedIn = true;
      state.token = payload;
    },
    logoutUser: (state) => {
      localStorage.removeItem('accessToken');
      state.currentUser = {};
      state.isLoggedIn = false;
      state.token = null;
    }
  }
});

export const {loginUser, logoutUser} = authSlice.actions;

export default authSlice.reducer;
