import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setSuccess } from '../globalStore/slices/alertSlice';
import { IUserProfile } from '../types'
import { getHeaders } from '../utils/getHeaders';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_JAVA }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    fetchAllUsers: builder.query<IUserProfile[], string>({
      query: (name) => ({
        url: `/users`,
        headers: getHeaders(),
      }),
      providesTags: ['Users'],
    }),
    fetchUserById: builder.query<IUserProfile, string>({
      query: (id) => ({
        url: `/users/${id}`,
        headers: getHeaders(),
      }),
      providesTags: (res, err, arg) => res ? [{ type: 'Users', id: res.id }] : ['Users'],
    }),
    updateUser: builder.mutation<IUserProfile, { id: string, body: Omit<IUserProfile, 'id'> }>({
      query: ({ id, body }) => ({
        url: `/users/${id}`,
        method: 'PATCH',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['Users'],
      onQueryStarted(_, { dispatch, queryFulfilled }) {
        queryFulfilled.then(() => dispatch(setSuccess('Successfully updated!'))).catch();
      },
    }),
    blockUser: builder.mutation<IUserProfile, string>({
      query: (id) => ({
        url: `/users/block/${id}`,
        method: 'GET',
        headers: getHeaders(),
      }),
      invalidatesTags: ['Users'],
      onQueryStarted(_, { dispatch, queryFulfilled }) {
        queryFulfilled.then(() => dispatch(setSuccess('Successfully blocked!'))).catch();
      },
    }),
    unblockUser: builder.mutation<IUserProfile, string>({
      query: (id) => ({
        url: `/users/unblock/${id}`,
        method: 'GET',
        headers: getHeaders(),
      }),
      invalidatesTags: ['Users'],
      onQueryStarted(_, { dispatch, queryFulfilled }) {
        queryFulfilled.then(() => dispatch(setSuccess('Successfully unblocked!'))).catch();
      },
    }),
    deleteUser: builder.mutation<IUserProfile, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
        headers: getHeaders(),
      }),
      invalidatesTags: ['Users'],
      onQueryStarted(_, { dispatch, queryFulfilled }) {
        queryFulfilled.then(() => dispatch(setSuccess('Successfully deleted!'))).catch();
      },
    }),
    topUpUserAccount: builder.mutation<{ email: string; amountOfMoney: number; id: string }, number>({
      query: (amountOfMoney) => ({
        url: `/bill`,
        method: 'PATCH',
        headers: getHeaders(),
        body: {
          amountOfMoney,
        },
      }),
      invalidatesTags: ['Users'],
      onQueryStarted(_, { dispatch, queryFulfilled }) {
        queryFulfilled.then(() => dispatch(setSuccess('Successfully updated!'))).catch();
      },
    }),
  }),
})

export const {
  useFetchAllUsersQuery,
  useFetchUserByIdQuery,
  useDeleteUserMutation,
  useBlockUserMutation,
  useUnblockUserMutation,
  useUpdateUserMutation,
  useTopUpUserAccountMutation,
} = usersApi;