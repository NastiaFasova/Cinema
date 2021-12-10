import { createAsyncThunk, createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit'
import { IUserLoginFormStandard } from '../../types';
import { postAPI } from '../../utils/fetchData';
import type { RootState } from '../store'

interface AuthState {
  user: any;
  loading: 'pending' | 'idle';
  error: SerializedError | null;
}

const initialState: AuthState = {
  user: 0,
  error: null,
  loading: 'pending',
}

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (form: IUserLoginFormStandard, thunkAPI) => {
    const res = await postAPI('login', form);
    console.log('RES', res);
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = 'idle';
      })
  },
})

// export const {  } = authSlice.actions

export const selectUser = (state: RootState) => state.auth.user

export default authSlice.reducer