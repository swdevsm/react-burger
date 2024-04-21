import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import { createGenericSlice, FetchApiState } from "./common";
import { user, UserSuccessResponse } from "../utils/auth-user-api";
import { ErrorResponse } from "../utils/auth.types";

export const userRequest = createAsyncThunk(
  "auth/user",
  async (request: string) => await user(request)
);

export const userSlice = createGenericSlice({
  name: "auth",
  initialState: { status: "loading" } as FetchApiState<
    UserSuccessResponse | ErrorResponse | Error | null
  >,
  reducers: {
    reset: (state) => {
      state.data = null;
      state.status = "loading";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userRequest.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(userRequest.fulfilled, (state, action) => {
      state.data = action.payload;
      if (action.payload as UserSuccessResponse) {
        state.status = "finished";
      }
      if (action.payload as ErrorResponse) {
        state.status = "error";
      }
    });
    builder.addCase(userRequest.rejected, (state, action) => {
      state.status = "error";
      state.data = action.error as ErrorResponse;
    });
  },
});

export const { start, success, error, reset } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
