import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setSuccess } from '../globalStore/slices/alertSlice';
import { ICinemaHall } from '../types'
import { getHeaders } from '../utils/getHeaders';

export const hallsApi = createApi({
  reducerPath: 'hallsApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_JAVA }),
  tagTypes: ['Halls'],
  endpoints: (builder) => ({
    fetchAllHalls: builder.query<ICinemaHall[], string>({
      query: (name) => ({
        url: `/cinema-halls`,
        headers: getHeaders(),
      }),
      providesTags: ['Halls'],
    }),
    createHall: builder.mutation<ICinemaHall, Omit<ICinemaHall, 'id'>>({
      query: (body) => ({
        url: '/cinema-halls',
        method: 'POST',
        body,
        headers: getHeaders(),
      }),
      invalidatesTags: ['Halls'],
      onQueryStarted(_, { dispatch, queryFulfilled }) {
        queryFulfilled.then(() => dispatch(setSuccess('Successfully added!'))).catch();
      },
    }),
    updateHall: builder.mutation<ICinemaHall, { id: string, body: Omit<ICinemaHall, 'id'> }>({
      query: ({ id, body }) => ({
        url: `/cinema-halls/${id}`,
        method: 'PATCH',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['Halls'],
      onQueryStarted(_, { dispatch, queryFulfilled }) {
        queryFulfilled.then(() => dispatch(setSuccess('Successfully updated!'))).catch();
      },
    }),
    deleteHall: builder.mutation<ICinemaHall, string>({
      query: (id) => ({
        url: `/cinema-halls/${id}`,
        method: 'DELETE',
        headers: getHeaders(),
      }),
      invalidatesTags: ['Halls'],
      onQueryStarted(_, { dispatch, queryFulfilled }) {
        queryFulfilled.then(() => dispatch(setSuccess('Successfully deleted!'))).catch();
      },
    }),
  }),
})

export const {
  useFetchAllHallsQuery,
  useCreateHallMutation,
  useDeleteHallMutation,
  useUpdateHallMutation
} = hallsApi;