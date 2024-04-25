import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { ApiData } from "../ApiData.types";
import { getIngredients } from "../utils/burger-api";
import { FetchApiState, createGenericSlice } from "./common";

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetch",
  getIngredients
);

export const ingredientsSlice = createGenericSlice({
  name: "ingredients",
  initialState: { status: "loading" } as FetchApiState<ApiData[]>,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "finished";
    });
    builder.addCase(fetchIngredients.rejected, (state) => {
      state.status = "error";
      state.data = [];
    });
  },
});

export const { success, start, error } = ingredientsSlice.actions;

export const selectIngredients = (state: RootState) => state.ingredients.data;

export default ingredientsSlice.reducer;
