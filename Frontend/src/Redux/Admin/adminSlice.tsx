/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AdminState {
  currentUser: any; // Consider replacing 'any' with a more specific type for currentUser
  loading: boolean;
  error: string | null;
  adminLogged: boolean;
}

const initialState: AdminState = {
  currentUser: null,
  loading: false,
  error: null,
  adminLogged: false,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    loginAdmin: (state) => {
      state.adminLogged = true;
    },
    logoutAdmin: (state) => {
      state.adminLogged = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setCurrentUser: (state, action: PayloadAction<any>) => {
      state.currentUser = action.payload; // Update 'any' to the correct type if available
    },
  },
});

export const { loginAdmin, logoutAdmin, setLoading, setError, setCurrentUser } = adminSlice.actions;
export default adminSlice.reducer;
