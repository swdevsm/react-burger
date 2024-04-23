import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import { createGenericSlice, FetchApiState } from "./common";
import {
  login,
  LoginSuccessResponse,
} from "../utils/auth-login-api";
import { ErrorResponse } from "../utils/auth.types";

export const loginRequest = createAsyncThunk("auth/login", login);

export const loginSlice = createGenericSlice({
  name: "auth",
  initialState: { status: "loading" } as FetchApiState<
    LoginSuccessResponse | ErrorResponse | Error | null
  >,
  reducers: {
    reset: (state) => {
      state.data = null;
      state.status = "loading";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginRequest.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(loginRequest.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "finished";
    });
    builder.addCase(loginRequest.rejected, (state, action) => {
      state.status = "error";
      state.data = action.error as ErrorResponse;
    });
  },
});

export const { start, success, error, reset } = loginSlice.actions;

export const selectLogin = (state: RootState) => state.login;

export default loginSlice.reducer;
