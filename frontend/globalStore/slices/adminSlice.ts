import { createAsyncThunk, createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit'
import { ICinemaHall, IUser } from '../../types';
import { getAPI, postAPI } from '../../utils/fetchData';
import type { RootState } from '../store'
import { setError, setSuccess } from './alertSlice';

interface AdminState {
  movies: any[];
  cinemaHalls: any[];
  movieSessions: any[];
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
    return { id: Number(thunkAPI.getState().admin.cinemaHalls.at(-1).id + 1), ...hall };
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
  },
})

// export const {  } = authSlice.actions

export const selectAdmin = (state: RootState) => state.admin

export default authSlice.reducer