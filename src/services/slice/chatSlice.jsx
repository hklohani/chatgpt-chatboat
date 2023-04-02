import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '../api/authApi';
import { chatApi } from '../api/chatApi';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    newChatButtonDisable: false,
    deleteChatGroupButtomDisable: false,
    newChatGroupId: null,
  },
  reducers: {
    setNewChatButtonDisable: (state, { payload: { disable } }) => {
      state.newChatButtonDisable = disable;
    },
    setNewChatGroupId: (state, { payload: { id } }) => {
      state.newChatGroupId = id;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(chatApi.endpoints.addChat.matchPending, (state) => {
      state.newChatButtonDisable = true;
      state.deleteChatGroupButtomDisable = true;
    });
    builder.addMatcher(chatApi.endpoints.addChat.matchFulfilled, (state) => {
      state.newChatButtonDisable = false;
      state.deleteChatGroupButtomDisable = false;
      state.newChatGroupId = null;
    });
    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (state, { payload }) => {
      state.newChatButtonDisable = false;
      state.deleteChatGroupButtomDisable = false;
      state.newChatGroupId = null;
    });
  },
});
export const { setNewChatButtonDisable, setNewChatGroupId } = chatSlice.actions;

export default chatSlice.reducer;
