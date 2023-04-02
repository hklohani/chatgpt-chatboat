import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '../api/authApi';

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null, redirect: null },
  reducers: {
    setCredentials: (state, { payload: { user, token } }) => {
      state.user = user;
      state.token = token;
    },
    resetState: (state) => {
      state.user = null;
      state.token = null;
      state.redirect = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      state.redirect = '/';
    });
    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (state, { payload }) => {
      state.token = null;
      state.user = null;
      state.redirect = '/login';
    });
  },
});

export const { setCredentials, resetState } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
