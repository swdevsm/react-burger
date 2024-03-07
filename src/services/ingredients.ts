import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import { ApiData } from "../ApiData.types";

interface IngredientsState {
  ingredients: ApiData[];
}

const initialState: IngredientsState = {
  ingredients: [],
};

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    setIngredients: (state, action: PayloadAction<ApiData[]>) => {
      state.ingredients = action.payload;
    },
  },
});

export const { setIngredients } = ingredientsSlice.actions;

export const selectIngredients = (state: RootState) =>
  state.ingredients.ingredients;

export default ingredientsSlice.reducer;
