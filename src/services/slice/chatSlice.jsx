import { createSlice } from "@reduxjs/toolkit";
import { chatApi } from "../api/chatApi";

const chatSlice = createSlice({
  name: "chat",
  initialState: { newChatButtonDisable: false },
  reducers: {
    setNewChatButtonDisable: (state, { payload: { disable } }) => {
      state.newChatButtonDisable = disable;
    },
  },
  //   extraReducers: (builder) => {
  //     builder.addMatcher(
  //       chatApi.endpoints.getChatGroup.matchFulfilled,
  //       (state, { payload }) => {
  //         console.log(payload);
  //         //   state.sendingInput = true;
  //       }
  //     );
  //   },
});
export const { setNewChatButtonDisable } = chatSlice.actions;

export default chatSlice.reducer;
