import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import { createGenericSlice, FetchApiState } from "./common";
import { ErrorResponse } from "../utils/auth.types";
import {
  refreshToken,
  RefreshTokenSuccessResponse,
} from "../utils/auth-refresh-token-api";

export const refreshTokenRequest = createAsyncThunk("auth/token", refreshToken);

export const refreshTokenSlice = createGenericSlice({
  name: "auth",
  initialState: { status: "loading" } as FetchApiState<
    RefreshTokenSuccessResponse | ErrorResponse | Error | null
  >,
  reducers: {
    reset: (state) => {
      state.data = null;
      state.status = "loading";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(refreshTokenRequest.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(refreshTokenRequest.fulfilled, (state, action) => {
      state.data = action.payload;
      if (action.payload as RefreshTokenSuccessResponse) {
        state.status = "finished";
      }
      if (action.payload as ErrorResponse) {
        state.status = "error";
      }
    });
    builder.addCase(refreshTokenRequest.rejected, (state, action) => {
      state.status = "error";
      state.data = action.error as ErrorResponse;
    });
  },
});

export const { start, success, error, reset } = refreshTokenSlice.actions;

export const selectRefreshToken = (state: RootState) => state.refreshToken;

export default refreshTokenSlice.reducer;
