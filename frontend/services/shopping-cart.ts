import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import axios from 'axios';
import { setSuccess } from '../globalStore/slices/alertSlice';
import { ICinemaSession, IFilm, IUserTickets } from '../types'
import { getHeaders } from '../utils/getHeaders';

export const shoppingCartApi = createApi({
  reducerPath: 'shoppingCartApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_JAVA }),
  tagTypes: ['ShoppingCart'],
  endpoints: (builder) => ({
    fetchAllUserTickets: builder.query<IUserTickets, string>({
      query: (name) => ({
        url: `/shopping-carts/by-user`,
        headers: getHeaders(),
      }),
      providesTags: ['ShoppingCart'],
    }),
    fetchAllUserOrders: builder.query<IUserTickets[], string>({
      query: (_) => ({
        url: `/orders`,
        headers: getHeaders(),
      }),
      providesTags: ['ShoppingCart'],
    }),
    addToShoppingCart: builder.mutation<IUserTickets, number>({
      query: (movieSessionId) => ({
        url: '/shopping-carts/add-movie-session',
        method: 'POST',
        headers: getHeaders(),
        body: {
          movieSessionId
        },
      }),
      invalidatesTags: ['ShoppingCart'],
      onQueryStarted(_, { dispatch, queryFulfilled }) {
        queryFulfilled.then(() => dispatch(setSuccess('Successfully added!'))).catch();
      },
    }),
    completeOrder: builder.mutation<IUserTickets, number>({
      query: (userId) => ({
        url: '/orders/complete',
        method: 'POST',
        headers: getHeaders(),
        body: {
          userId,
        },
      }),
      invalidatesTags: ['ShoppingCart'],
      onQueryStarted(_, { dispatch, queryFulfilled }) {
        queryFulfilled.then(() => dispatch(setSuccess('Order successfully completed!'))).catch();
      },
    }),
    removeFromShoppingCart: builder.mutation<IUserTickets, { id: number; movieSessionId: number; }>({
      query: ({ id, movieSessionId }) => ({
        url: `/shopping-carts/remove-movie-session/${id}`,
        method: 'DELETE',
        headers: getHeaders(),
        body: {
          movieSessionId,
        }
      }),
      invalidatesTags: ['ShoppingCart'],
      onQueryStarted(_, { dispatch, queryFulfilled }) {
        queryFulfilled.then(() => dispatch(setSuccess('Successfully removed!'))).catch();
      },
    }),
  }),
})

export const {
  useAddToShoppingCartMutation,
  useCompleteOrderMutation,
  useRemoveFromShoppingCartMutation,
  useFetchAllUserTicketsQuery,
  useFetchAllUserOrdersQuery,
} = shoppingCartApi;