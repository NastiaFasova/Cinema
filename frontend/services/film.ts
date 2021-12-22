import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import axios from 'axios';
import { setSuccess } from '../globalStore/slices/alertSlice';
import { IFilm, IFilmLink } from '../types'

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_JAVA }),
  tagTypes: ['Movies'],
  endpoints: (builder) => ({
    fetchAllMovies: builder.query<(IFilm & IFilmLink)[], string>({
      query: (name) => ({
        url: `/movies`,
      }),
      providesTags: ['Movies'],
      transformResponse: async (movieLinks: IFilmLink[]) => {
        // This is bad code practise, but in case of my coursework
        // it was necessary to leave as it is
        const apiFilms = await Promise.all(movieLinks.map((async (f) => {
          const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${f.apiId}`);
          return { ...data, ...f };
        })));
        return apiFilms as (IFilm & IFilmLink)[];
      },
    }),
    createMovie: builder.mutation<IFilmLink, Omit<IFilmLink, 'id'>>({
      query: (body) => ({
        url: '/movies',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Movies'],
      onQueryStarted(_, { dispatch, queryFulfilled }) {
        queryFulfilled.then(() => dispatch(setSuccess('Successfully added!'))).catch();
      },
    }),
    updateMovie: builder.mutation<IFilmLink, { id: string, body: Omit<IFilmLink, 'id'> }>({
      query: ({ id, body }) => ({
        url: `/movies/${id}`,
        method: 'PATCH',
        headers: {
          'Authorization': `Basic ${JSON.parse(localStorage?.getItem('user') ?? 'null')?.token}`,
          'X-CSRF-TOKEN': JSON.parse(localStorage?.getItem('user') ?? 'null')?.jwtToken || '',
        },
        body,
      }),
      invalidatesTags: ['Movies'],
      onQueryStarted(_, { dispatch, queryFulfilled }) {
        queryFulfilled.then(() => dispatch(setSuccess('Successfully updated!'))).catch();
      },
    }),
    deleteMovie: builder.mutation<IFilmLink, string>({
      query: (id) => ({
        url: `/movies/${id}`,
        method: 'DELETE',
        headers: {
          'Authorization': `Basic ${JSON.parse(localStorage?.getItem('user') ?? 'null')?.token}`,
          'X-CSRF-TOKEN': JSON.parse(localStorage?.getItem('user') ?? 'null')?.jwtToken || '',
        },
      }),
      invalidatesTags: ['Movies'],
      onQueryStarted(_, { dispatch, queryFulfilled }) {
        queryFulfilled.then(() => dispatch(setSuccess('Successfully deleted!'))).catch();
      },
    }),
  }),
})

export const {
  useFetchAllMoviesQuery,
  useCreateMovieMutation,
  useDeleteMovieMutation,
  useUpdateMovieMutation
} = moviesApi;