import { emptySplitApi } from "./emptySplitApi";

export const authApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
    }),
    logout: builder.mutation({
      query: (body) => ({
        url: "auth/logout",
        method: "POST",
        // body: body,
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApi;
