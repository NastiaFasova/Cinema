import { createAsyncThunk, createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit'
import { IUserAuthFormStandard, IUserProfile } from '../../types';
import { getAPI, postAPI } from '../../utils/fetchData';
import type { RootState } from '../store'
import { setError, setSuccess } from './alertSlice';

interface AuthState {
  user: IUserProfile;
  loading: 'pending' | 'idle';
  error: SerializedError | null;
}

const initialState: AuthState = {
  user: (typeof window !== "undefined" && JSON.parse(window?.localStorage?.getItem('user') || 'null') as unknown as IUserProfile) || {
    id: '',
    email: '',
    token: '',
    jwtToken: '',
    role: null,
    blocked: false,
    firstname: '',
    lastname: '',
    bill: 0,
  },
  error: null,
  loading: 'idle',
}

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (form: IUserAuthFormStandard, thunkAPI) => {
    const token = btoa(`${form.email}:${form.password}`);
    const { data, error, headers } = await postAPI('login', form, token);
    if (error) {
      thunkAPI.dispatch(setError("Bad credentials"));
      throw new Error(error?.error);
    }

    const user: IUserProfile = {
      id: data?.id || '',
      email: form.email,
      token,
      jwtToken: data?.token?.token,
      role: data?.role.slice(1,).slice(0, -1),
      blocked: data?.blocked,
      bill: data?.bill || 0,
      firstname: data?.firstname || '',
      lastname: data?.lastname || '',
    };

    localStorage.setItem('user', JSON.stringify(user))
    return user;
  },
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (form: IUserAuthFormStandard, thunkAPI) => {
    const token = btoa(`${form.email}:${form.password}`);
    const { data: registeredUser, error: regErr } = await postAPI('register', form);
    const { data, error, headers } = await postAPI('login', form, token);
    if (error || regErr) {
      thunkAPI.dispatch(setError("Bad credentials"));
      throw new Error(error?.error);
    }

    thunkAPI.dispatch(setSuccess(`User registered with email ${form.email}`));
    const user: IUserProfile = {
      id: data?.id || '',
      email: form.email,
      token,
      jwtToken: data?.token?.token,
      role: data?.role.slice(1,).slice(0, -1),
      blocked: data?.blocked,
      bill: data?.bill || 0,
      firstname: data?.firstname || '',
      lastname: data?.lastname || '',
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
  reducers: {
    updateBlockStatus(state, action: PayloadAction<boolean>) {
      state.user.blocked = action.payload;
      localStorage.setItem('user', JSON.stringify(state.user))
    },
    updateAccountBalance(state, action: PayloadAction<number>) {
      state.user.bill += action.payload;
      localStorage.setItem('user', JSON.stringify(state.user))
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logout.fulfilled, (state, action) => {
        state.user = {
          id: '',
          email: '',
          token: '',
          jwtToken: '',
          bill: 0,
          firstname: '',
          lastname: '',
          role: null,
          blocked: false,
        };
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

export const { updateBlockStatus, updateAccountBalance } = authSlice.actions

export const selectUser = (state: RootState) => state.auth.user
export const selectAuth = (state: RootState) => state.auth

export default authSlice.reducer