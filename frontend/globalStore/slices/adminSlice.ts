import { createAsyncThunk, createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit'
import { ICinemaHall, ICinemaSession, IFilmLink, IUser } from '../../types';
import { deleteAPI, getAPI, postAPI } from '../../utils/fetchData';
import type { RootState } from '../store'
import { setError, setSuccess } from './alertSlice';

interface AdminState {
  movies: IFilmLink[];
  cinemaHalls: ICinemaHall[];
  movieSessions: ICinemaSession[];
  loading: 'pending' | 'idle';
  error: SerializedError | null;
}

const initialState: AdminState = {
  movies: [],
  cinemaHalls: [],
  movieSessions: [],
  error: null,
  loading: 'idle',
}

export const getHalls = createAsyncThunk<
  ICinemaHall[], any,
  { state: RootState }
>(
  'admin/getHalls',
  async (_, thunkAPI) => {
    const user = thunkAPI.getState().auth.user;
    const data = await getAPI('cinema-halls', user.token, user.jwtToken);

    return data as ICinemaHall[];
  },
);

export const getSessions = createAsyncThunk<
  ICinemaSession[], any,
  { state: RootState }
>(
  'admin/getSessions',
  async (_, thunkAPI) => {
    const user = thunkAPI.getState().auth.user;
    const data = await getAPI('movie-sessions', user.token, user.jwtToken);

    return data as ICinemaSession[];
  },
);

export const getMovies = createAsyncThunk<
  IFilmLink[], any,
  { state: RootState }
>(
  'admin/getMovies',
  async (_, thunkAPI) => {
    const user = thunkAPI.getState().auth.user;
    const data = await getAPI('movies', user.token, user.jwtToken);
    console.log('data', data)
    return data as IFilmLink[];
  },
);

export const addHall = createAsyncThunk<
  ICinemaHall, any,
  { state: RootState }
>(
  'admin/addHall',
  async (hall, thunkAPI) => {
    const user = thunkAPI.getState().auth.user;
    const { data, error } = await postAPI('cinema-halls', hall, user.token, user.jwtToken);
    if (error) {
      thunkAPI.dispatch(setError('Something bad happens'));
      return;
    }
    thunkAPI.dispatch(setSuccess('Successfully added'));
    // That's so fucking bad)
    return { id: Number(thunkAPI.getState().admin.movies?.at(-1)?.id || 0 + 1), ...hall };
  },
);

export const addSession = createAsyncThunk<
  ICinemaSession, any,
  { state: RootState }
>(
  'admin/addSession',
  async (session, thunkAPI) => {
    const user = thunkAPI.getState().auth.user;
    const { data, error } = await postAPI('movie-sessions',
      {
        showTime: session.date.toISOString().slice(0, -1),
        cinemaHallId: Number(session.hall),
        movieTitle: session.film,
      },
      user.token, user.jwtToken);
    if (error) {
      thunkAPI.dispatch(setError('Something bad happens'));
      return;
    }
    thunkAPI.dispatch(setSuccess('Successfully added'));
    // That's so fucking bad)
    return { id: Number(thunkAPI.getState().admin.movieSessions?.at(-1)?.id || 0 + 1), ...session };
  },
);

export const addMovie = createAsyncThunk<
  IFilmLink, any,
  { state: RootState }
>(
  'admin/addMovie',
  async (movie, thunkAPI) => {
    const user = thunkAPI.getState().auth.user;
    const { data, error } = await postAPI('movies', movie, user.token, user.jwtToken);
    if (error) {
      thunkAPI.dispatch(setError('Something bad happens'));
      return;
    }
    thunkAPI.dispatch(setSuccess('Successfully added'));
    // That's so fucking bad)
    return { id: Number(thunkAPI.getState().admin.cinemaHalls.at(-1)?.id ?? 0 + 1), ...movie };
  },
);

export const deleteHall = createAsyncThunk<
  string, any,
  { state: RootState }
>(
  'admin/deleteHall',
  async (hallId: string, thunkAPI) => {
    const user = thunkAPI.getState().auth.user;
    const { data, error } = await deleteAPI(`cinema-halls/${hallId}`, user.token, user.jwtToken);
    if (error) {
      thunkAPI.dispatch(setError('Something bad happens'));
      return '';
    }
    thunkAPI.dispatch(setSuccess('Successfully deleted'));
    // That's so fucking bad)
    return hallId;
  },
);

export const deleteMovie = createAsyncThunk<
  string, any,
  { state: RootState }
>(
  'admin/deleteMovie',
  async (movieId: string, thunkAPI) => {
    const user = thunkAPI.getState().auth.user;
    const { data, error } = await deleteAPI(`movies/${movieId}`, user.token, user.jwtToken);
    if (error) {
      thunkAPI.dispatch(setError('Something bad happens'));
      return '';
    }
    thunkAPI.dispatch(setSuccess('Successfully deleted'));
    // That's so fucking bad)
    return movieId;
  },
);

export const deleteSession = createAsyncThunk<
  string, any,
  { state: RootState }
>(
  'admin/deleteSesion',
  async (movieId: string, thunkAPI) => {
    const user = thunkAPI.getState().auth.user;
    const { data, error } = await deleteAPI(`movie-sessions/${movieId}`, user.token, user.jwtToken);
    if (error) {
      thunkAPI.dispatch(setError('Something bad happens'));
      return '';
    }
    thunkAPI.dispatch(setSuccess('Successfully deleted'));
    // That's so fucking bad)
    return movieId;
  },
);


export const authSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHalls.fulfilled, (state, action) => {
        state.cinemaHalls = action.payload;
        state.loading = 'idle';
      })
      .addCase(getHalls.pending, (state, action) => {
        state.loading = 'pending';
      })
      .addCase(getHalls.rejected, (state, action) => {
        state.error = action.error;
        state.loading = 'idle';
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
        state.loading = 'idle';
      })
      .addCase(getMovies.pending, (state, action) => {
        state.loading = 'pending';
      })
      .addCase(getMovies.rejected, (state, action) => {
        state.error = action.error;
        state.loading = 'idle';
      })
      .addCase(getSessions.fulfilled, (state, action) => {
        state.movieSessions = action.payload;
        state.loading = 'idle';
      })
      .addCase(getSessions.pending, (state, action) => {
        state.loading = 'pending';
      })
      .addCase(getSessions.rejected, (state, action) => {
        state.error = action.error;
        state.loading = 'idle';
      })
      .addCase(addHall.fulfilled, (state, action) => {
        if (action.payload) {
          state.cinemaHalls.push(action.payload);
        }
        state.loading = 'idle';
      })
      .addCase(addHall.pending, (state, action) => {
        state.loading = 'pending';
      })
      .addCase(addHall.rejected, (state, action) => {
        state.error = action.error;
        state.loading = 'idle';
      })
      .addCase(addMovie.fulfilled, (state, action) => {
        if (action.payload) {
          state.movies.push(action.payload);
        }
        state.loading = 'idle';
      })
      .addCase(addMovie.pending, (state, action) => {
        state.loading = 'pending';
      })
      .addCase(addMovie.rejected, (state, action) => {
        state.error = action.error;
        state.loading = 'idle';
      })
      .addCase(addSession.fulfilled, (state, action) => {
        if (action.payload) {
          state.movieSessions.push(action.payload);
        }
        state.loading = 'idle';
      })
      .addCase(addSession.pending, (state, action) => {
        state.loading = 'pending';
      })
      .addCase(addSession.rejected, (state, action) => {
        state.error = action.error;
        state.loading = 'idle';
      })
      .addCase(deleteHall.fulfilled, (state, action) => {
        state.cinemaHalls = state.cinemaHalls.filter((hall) => hall.id !== Number(action.payload));
        state.loading = 'idle';
      })
      .addCase(deleteHall.pending, (state, action) => {
        state.loading = 'pending';
      })
      .addCase(deleteHall.rejected, (state, action) => {
        state.error = action.error;
        state.loading = 'idle';
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.movies = state.movies.filter((film) => film.id !== Number(action.payload));
        state.loading = 'idle';
      })
      .addCase(deleteMovie.pending, (state, action) => {
        state.loading = 'pending';
      })
      .addCase(deleteMovie.rejected, (state, action) => {
        state.error = action.error;
        state.loading = 'idle';
      })
      .addCase(deleteSession.fulfilled, (state, action) => {
        state.movieSessions = state.movieSessions.filter((session) => session.id !== Number(action.payload));
        state.loading = 'idle';
      })
      .addCase(deleteSession.pending, (state, action) => {
        state.loading = 'pending';
      })
      .addCase(deleteSession.rejected, (state, action) => {
        state.error = action.error;
        state.loading = 'idle';
      })
  },
})

// export const {  } = authSlice.actions

export const selectAdmin = (state: RootState) => state.admin

export default authSlice.reducer