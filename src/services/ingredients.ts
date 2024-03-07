import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import { ApiData } from "../ApiData.types";
import { Order } from "../components/order-details/OrderDetails.types";

interface GlobalState {
  ingredients: ApiData[];
  selectedIngredients: ApiData[];
  ingredientDetails?: ApiData | null;
  order?: Order | null;
}

const initialState: GlobalState = {
  ingredients: [],
  selectedIngredients: [],
  ingredientDetails: null,
  order: null,
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
