import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
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
    clearIngredientsDetails: (state) => {
      state.ingredientDetails = null;
    },
  },
});

export const { setIngredientsDetails, clearIngredientsDetails } =
  ingredientsDetailsSlice.actions;

export const selectIngredients = (state: RootState) =>
  state.ingredientDetails.ingredientDetails;

export default ingredientsDetailsSlice.reducer;
