import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import { createGenericSlice, FetchApiState } from "./common";
import { passwordResetAction, PasswordWithToken } from "../utils/auth-api";

export const passwordResetActionRequest = createAsyncThunk(
  "auth/passwordReset/reset",
  async (passwordWithToken: PasswordWithToken) =>
    (await passwordResetAction(passwordWithToken)) as boolean
);

export const passwordResetActionSlice = createGenericSlice({
  name: "auth",
  initialState: { status: "loading" } as FetchApiState<boolean | null>,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(passwordResetActionRequest.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(passwordResetActionRequest.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "finished";
    });
    builder.addCase(passwordResetActionRequest.rejected, (state) => {
      state.status = "error";
      state.data = null;
    });
  },
});

export const { start, success, error } = passwordResetActionSlice.actions;

export const selectPasswordResetAction = (state: RootState) =>
  state.passwordResetAction;

export default passwordResetActionSlice.reducer;
