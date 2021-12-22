import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import axios from 'axios';
import { setSuccess } from '../globalStore/slices/alertSlice';
import { ICinemaSession, IFilm } from '../types'
import { getHeaders } from '../utils/getHeaders';

export const movieSessionsApi = createApi({
  reducerPath: 'movieSessionsApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_JAVA }),
  tagTypes: ['MovieSessions'],
  endpoints: (builder) => ({
    fetchAllMovieSessions: builder.query<ICinemaSession[], string>({
      query: (name) => ({
        url: `/movie-sessions`,
        headers: getHeaders(),
      }),
      transformResponse: async (sessions: ICinemaSession[]) => {
        // This is bad. Will try to solve this another way
        const movieSessionsWithData = await Promise.all(sessions.map((async (s) => {
          const { data } = await axios.get<IFilm>(`${process.env.NEXT_PUBLIC_API_URL}${s.apiId}`);
          return { ...s, description: data.Plot, image: data.Poster, id: s.movieSessionId };
        })));
        return movieSessionsWithData as ICinemaSession[];
      },
      providesTags: ['MovieSessions'],
    }),
    createMovieSession: builder.mutation<ICinemaSession, Omit<ICinemaSession, 'id'>>({
      query: (body) => ({
        url: '/movie-sessions',
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['MovieSessions'],
      onQueryStarted(_, { dispatch, queryFulfilled }) {
        queryFulfilled.then(() => dispatch(setSuccess('Successfully added!'))).catch();
      },
    }),
    updateMovieSession: builder.mutation<ICinemaSession, { id: string, body: Omit<ICinemaSession, 'id'> }>({
      query: ({ id, body }) => ({
        url: `/movie-sessions/${id}`,
        method: 'PATCH',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['MovieSessions'],
      onQueryStarted(_, { dispatch, queryFulfilled }) {
        queryFulfilled.then(() => dispatch(setSuccess('Successfully updated!'))).catch();
      },
    }),
    deleteMovieSession: builder.mutation<ICinemaSession, string>({
      query: (id) => ({
        url: `/movie-sessions/${id}`,
        method: 'DELETE',
        headers: getHeaders(),
      }),
      invalidatesTags: ['MovieSessions'],
      onQueryStarted(_, { dispatch, queryFulfilled }) {
        queryFulfilled.then(() => dispatch(setSuccess('Successfully deleted!'))).catch();
      },
    }),
  }),
})

export const {
  useFetchAllMovieSessionsQuery,
  useCreateMovieSessionMutation,
  useDeleteMovieSessionMutation,
  useUpdateMovieSessionMutation
} = movieSessionsApi;