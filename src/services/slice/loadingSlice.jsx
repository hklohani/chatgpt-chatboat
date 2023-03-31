import { createSlice } from '@reduxjs/toolkit';
import { chatApi } from '../api/chatApi';

const loadingSlice = createSlice({
  name: 'loading',
  initialState: { sendingInput: false },
  reducers: {
    setCredentials: (state, { payload: { user, token } }) => {
      state.user = user;
      state.token = token;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(chatApi.endpoints.addChat.matchPending, (state) => {
      state.sendingInput = true;
    });
    builder.addMatcher(chatApi.endpoints.addChat.matchFulfilled, (state) => {
      state.sendingInput = false;
    });
  },
});

// export const { setCredentials } = loadingSlice.actions;

export default loadingSlice.reducer;
