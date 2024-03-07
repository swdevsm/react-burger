import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import { ApiData } from "../ApiData.types";

interface IngredientsDetailsState {
  ingredientDetails?: ApiData | null;
}

const initialState: IngredientsDetailsState = {
  ingredientDetails: null,
};

export const ingredientsDetailsSlice = createSlice({
  name: "ingredientsDetails",
  initialState,
  reducers: {
    setIngredientsDetails: (state, action: PayloadAction<ApiData>) => {
      state.ingredientDetails = action.payload;
    },
  },
});

export const { setIngredientsDetails } = ingredientsDetailsSlice.actions;

export const selectIngredients = (state: RootState) =>
  state.ingredientDetails.ingredientDetails;

export default ingredientsDetailsSlice.reducer;
