import { User } from "@/types/auth";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

type AuthState = {
  user: User | null;
  token: string | null;
  authenticated: boolean;
};

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null, authenticated: false } as AuthState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: { user, token },
      }: PayloadAction<{ user: User; token: string }>,
    ) => {
      state.user = user;
      state.token = token;
      state.authenticated = true;
    },
    clearCredentials: (state) => {
      state.user = null;
      state.token = null;
      state.authenticated = false;
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export default authSlice.reducer;
