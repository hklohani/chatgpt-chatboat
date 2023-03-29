import { emptySplitApi } from "./emptySplitApi";

export const chatApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    addChatGroup: builder.mutation({
      query: (body) => ({
        url: "chat-group",
        method: "POST",
        body,
      }),
      invalidatesTags: ["ChatGroup"],
    }),
    addChat: builder.mutation({
      query: (body) => ({
        url: "chats",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Chat", "ChatGroup"],
    }),
    getChats: builder.query({
      query: ({ groupId }) => `chats?group_id=${groupId}`,
      providesTags: ["Chat"],
    }),
    getChatGroup: builder.query({
      query: (name) => `chat-group`,
      providesTags: ["ChatGroup"],
    }),
  }),
});

export const {
  useAddChatMutation,
  useAddChatGroupMutation,
  useGetChatsQuery,
  useGetChatGroupQuery,
} = chatApi;
