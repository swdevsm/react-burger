import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import { createGenericSlice, FetchApiState } from "./common";
import {
  updateUser,
  UpdateUserRequest,
  UserSuccessResponse,
} from "../utils/auth-user-api";
import { ErrorResponse } from "../utils/auth.types";

export const updateUserRequest = createAsyncThunk(
  "auth/user/update",
  async (updateUserRequest: UpdateUserRequest) =>
    await updateUser(updateUserRequest)
);

export const updateUserSlice = createGenericSlice({
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
    builder.addCase(updateUserRequest.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateUserRequest.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "finished";
    });
    builder.addCase(updateUserRequest.rejected, (state, action) => {
      state.status = "error";
      state.data = action.error as ErrorResponse;
    });
  },
});

export const { start, success, error, reset } = updateUserSlice.actions;

export const selectUser = (state: RootState) => state.updateUser;

export default updateUserSlice.reducer;
