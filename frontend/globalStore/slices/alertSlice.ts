import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface AlertState {
  error: string | null;
  success: string | null;
}

const initialState: AlertState = {
  error: null,
  success: null,
};

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setSuccess(state, action) {
      state.success = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    removeAlert(state) {
      state.success = null;
      state.error = null;
    },
  },
});
export const { setSuccess, setError, removeAlert } = alertSlice.actions;
export const selectAlert = (state: RootState) => state.alert;

export default alertSlice.reducer;