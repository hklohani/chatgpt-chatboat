// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const emptySplitApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api/",
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = getState()?.auth?.token;
      if (token) {
        headers.set("Authorization", `Token ${token}`);
        headers.set("Content-Type", "application/json");
      }
      return headers;
    },
  }),

  endpoints: () => ({}),
});
