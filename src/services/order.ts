import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import { createOrder } from "../utils/burger-api";
import { createGenericSlice, FetchApiState } from "./common";

export const createOrderRequest = createAsyncThunk(
  "order/create",
  async (selectedIngredients: string[]) =>
    (await createOrder(selectedIngredients)) as number
);

export const orderSlice = createGenericSlice({
  name: "order",
  initialState: { status: "loading" } as FetchApiState<number | null>,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createOrderRequest.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createOrderRequest.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "finished";
    });
    builder.addCase(createOrderRequest.rejected, (state) => {
      state.status = "error";
      state.data = null;
    });
  },
});

export const { start, success, error } = orderSlice.actions;

export const selectOrder = (state: RootState) => state.order;

export default orderSlice.reducer;
