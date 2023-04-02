// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const emptySplitApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://192.168.1.10:8000/api/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.token;
      if (token) {
        headers.set('Authorization', `Token ${token}`);
        headers.set('Content-Type', 'application/json');
      }
      return headers;
    },
  }),

  endpoints: () => ({}),
});
