import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Item {
  id: number;
  name: string;
  startingPrice: string;
  description: string;
  currentHighestBid: string;
  remainingTime: string;
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    getItems: builder.query<Item[], void>({
      query: () => '/items/available',
    }),
    getItemDetails: builder.query({
      query: (id) => `items/${id}`,
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: '/users/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    placeBid: builder.mutation({
      query: (bidData) => ({
        url: `/bids/${bidData.itemId}`,
        method: 'POST',
        body: {
          userId: bidData.userId,
          amount: bidData.amount,
        },
      }),
    }),
  }),
});

export const {
  useGetItemsQuery,
  useGetItemDetailsQuery,
  useLoginMutation,
  usePlaceBidMutation,
} = apiSlice;
