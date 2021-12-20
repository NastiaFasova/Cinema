import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import axios from 'axios';
import { IFilm, IFilmLink } from '../types'

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_JAVA }),
  tagTypes: ['Movies'],
  endpoints: (builder) => ({
    fetchAllMovies: builder.query<IFilm[], string>({
      query: (name) => ({
        url: `/movies`,
      }),
      transformResponse: async (movieLinks: IFilmLink[]) => {
        // This is bad code practise, but in case of my coursework
        // it was necessary to leave as it is
        const apiFilms = await Promise.all(movieLinks.map((async (f) => {
          const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${f.apiId}`);
          return { ...data, id: f.apiId };
        })));
        return apiFilms as IFilm[];
      },
    }),
  }),
})

export const { useFetchAllMoviesQuery } = moviesApi;