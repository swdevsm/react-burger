import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import { createGenericSlice, FetchApiState } from "./common";
import { passwordReset } from "../utils/auth-password-reset-api";

export const passwordResetRequest = createAsyncThunk(
  "auth/passwordReset",
  async (email: string) => (await passwordReset(email)) as boolean
);

export const passwordResetSlice = createGenericSlice({
  name: "auth",
  initialState: { status: "loading" } as FetchApiState<boolean | null>,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(passwordResetRequest.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(passwordResetRequest.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "finished";
    });
    builder.addCase(passwordResetRequest.rejected, (state) => {
      state.status = "error";
      state.data = null;
    });
  },
});

export const { start, success, error } = passwordResetSlice.actions;

export const selectPasswordReset = (state: RootState) => state.passwordReset;

export default passwordResetSlice.reducer;
