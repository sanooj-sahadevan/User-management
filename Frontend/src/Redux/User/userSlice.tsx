/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  currentUser: any; // You might want to replace 'any' with a more specific type for currentUser
  loading: boolean;
  error: string | null;
  userLogged: boolean;
}

const initialState: UserState = {
  currentUser: null,
  loading: false,
  error: null,
  userLogged: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action: PayloadAction<any>) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
      state.userLogged = true;
    },
    signInFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.userLogged = false;
    },
    loginUser: (state) => {
      state.userLogged = true;
    },
    logoutUser: (state) => {
      state.userLogged = false;
      state.currentUser = null;
    }
  },
});

export const { signInStart, signInSuccess, signInFailure, loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
