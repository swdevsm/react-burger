import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import { createGenericSlice, FetchApiState } from "./common";
import {
  logout,
  LogoutRequest,
  LogoutResponse,
} from "../utils/auth-logout-api";

export const logoutRequest = createAsyncThunk(
  "auth/logout",
  async (request: LogoutRequest) => await logout(request)
);

export const logoutSlice = createGenericSlice({
  name: "auth",
  initialState: { status: "loading" } as FetchApiState<
    LogoutResponse | Error | null
  >,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(logoutRequest.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(logoutRequest.fulfilled, (state, action) => {
      state.status = "finished";
      state.data = action.payload as LogoutResponse;
    });
    builder.addCase(logoutRequest.rejected, (state, action) => {
      state.status = "error";
      state.data = action.error as LogoutResponse;
    });
  },
});

export const { start, success, error } = logoutSlice.actions;

export const selectLogout = (state: RootState) => state.logout;

export default logoutSlice.reducer;
