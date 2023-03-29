import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null, redirect: null },
  reducers: {
    setCredentials: (state, { payload: { user, token } }) => {
      state.user = user;
      state.token = token;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.user = { email: payload.email };
        state.token = payload.auth_token;
        state.redirect = "/";
      }
    );
    builder.addMatcher(
      authApi.endpoints.logout.matchFulfilled,
      (state, { payload }) => {
        state.token = null;
        state.user = null;
        state.redirect = "/login";
      }
    );
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
