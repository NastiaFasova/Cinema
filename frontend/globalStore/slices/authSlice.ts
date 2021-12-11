import { createAsyncThunk, createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit'
import { IUser, IUserAuthFormStandard } from '../../types';
import { getAPI, postAPI } from '../../utils/fetchData';
import type { RootState } from '../store'
import { setError, setSuccess } from './alertSlice';

interface AuthState {
  user: IUser;
  loading: 'pending' | 'idle';
  error: SerializedError | null;
}

const initialState: AuthState = {
  user: (typeof window !== "undefined" && JSON.parse(window?.localStorage?.getItem('user') || 'null') as unknown as IUser) || {
    email: '',
  },
  error: null,
  loading: 'idle',
}

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (form: IUserAuthFormStandard, thunkAPI) => {
    const { data, error } = await postAPI('auth/login', form);
    if (error) {
      thunkAPI.dispatch(setError(error.error));
      throw new Error(error.error);
    }
    const user = {
      email: form.email,
    };

    localStorage.setItem('user', JSON.stringify(user))
    return user;
  },
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (form: IUserAuthFormStandard, thunkAPI) => {
    const { data, error } = await postAPI('register', form);
    if (error) {
      thunkAPI.dispatch(setError(error.error));
      throw new Error(error.error);
    }

    thunkAPI.dispatch(setSuccess(`User registered with email ${form.email}`));
    const user = {
      email: form.email,
    };

    localStorage.setItem('user', JSON.stringify(user))
    return user;
  },
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    localStorage.removeItem('user');
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logout.fulfilled, (state, action) => {
        state.user = { email: '' };
        state.loading = 'idle';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = 'idle';
      })
      .addCase(loginUser.pending, (state, action) => {
        state.loading = 'pending';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error;
        state.loading = 'idle';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = 'idle';
      })
      .addCase(registerUser.pending, (state, action) => {
        state.loading = 'pending';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error;
        state.loading = 'idle';
      })
  },
})

// export const {  } = authSlice.actions

export const selectUser = (state: RootState) => state.auth.user
export const selectAuth = (state: RootState) => state.auth

export default authSlice.reducer