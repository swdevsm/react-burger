import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import { ApiData } from "../ApiData.types";

interface BurgerConstructorState {
  selectedIngredients: ApiData[];
}

const initialState: BurgerConstructorState = {
  selectedIngredients: [],
};

export const burgerConstructorSlice = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {
    setSelectedIngredients: (state, action: PayloadAction<ApiData[]>) => {
      state.selectedIngredients = action.payload;
    },
    addIngredient: (state, action: PayloadAction<ApiData>) => {
      if (action.payload.type !== "bun") {
        // fixme: bun should be replaced ?
        state.selectedIngredients = [
          ...state.selectedIngredients,
          action.payload,
        ];
      }
    },
  },
});

export const { setSelectedIngredients, addIngredient } =
  burgerConstructorSlice.actions;

export const selectSelectedIngredients = (state: RootState) =>
  state.burgerConstructor.selectedIngredients;

export default burgerConstructorSlice.reducer;
