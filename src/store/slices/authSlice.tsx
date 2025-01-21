// src/store/slices/authSlice.tsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the type for your initial state
interface AuthState {
  user: any | null; // You can replace 'any' with a more specific type for the user if you have one
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: any }>) => {
      const { user } = action.payload;
      state.user = user;
    },
    logoutUser: (state) => {
      state.user = null;
    },
  },
});

export const { setCredentials, logoutUser } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: { auth: AuthState }) =>
  state.auth.user;
