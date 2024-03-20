import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import { createGenericSlice, FetchApiState } from "./common";
import {
  register,
  RegisterRequest,
  RegisterSuccessResponse,
} from "../utils/auth-register-api";
import { ErrorResponse } from "../utils/auth.types";

export const registerRequest = createAsyncThunk(
  "auth/register",
  async (request: RegisterRequest) => await register(request)
);

export const registerSlice = createGenericSlice({
  name: "auth",
  initialState: { status: "loading" } as FetchApiState<
    RegisterSuccessResponse | ErrorResponse | Error | null
  >,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerRequest.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(registerRequest.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "finished";
    });
    builder.addCase(registerRequest.rejected, (state, action) => {
      state.status = "error";
      state.data = action.error as ErrorResponse;
    });
  },
});

export const { start, success, error } = registerSlice.actions;

export const selectRegister = (state: RootState) => state.register;

export default registerSlice.reducer;
