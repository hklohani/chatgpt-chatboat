import { emptySplitApi } from './emptySplitApi';

export const chatApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    addChatGroup: builder.mutation({
      query: (body) => ({
        url: 'chat-group',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['ChatGroup'],
    }),
    deleteChatGroup: builder.mutation({
      query: (id) => ({
        url: `chat-group/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ChatGroup', 'Chat'],
    }),
    deleteAllChatGroup: builder.mutation({
      query: (body) => ({
        url: `chat-group-delete`,
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['ChatGroup', 'Chat'],
    }),
    addChat: builder.mutation({
      query: (body) => ({
        url: 'chats',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Chat', 'ChatGroup'],
    }),
    getChats: builder.query({
      query: ({ groupId }) => `chats?group_id=${groupId}`,
      providesTags: (result) =>
        result
          ? [...result.data.map(({ id }) => ({ type: 'Chat', id })), { type: 'Chat', id: 'LIST' }]
          : [{ type: 'Chat', id: 'LIST' }],
    }),
    getChatGroup: builder.query({
      query: (name) => `chat-group`,
      providesTags: (result) =>
        result
          ? [...result.data.map(({ id }) => ({ type: 'ChatGroup', id })), { type: 'ChatGroup', id: 'LIST' }]
          : [{ type: 'ChatGroup', id: 'LIST' }],
    }),
  }),
});

export const {
  useAddChatMutation,
  useAddChatGroupMutation,
  useGetChatsQuery,
  useGetChatGroupQuery,
  useDeleteChatGroupMutation,
  useDeleteAllChatGroupMutation,
} = chatApi;
