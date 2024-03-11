import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import { ApiData } from "../ApiData.types";

interface BurgerConstructorState {
  selectedBun?: ApiData;
  selectedIngredients: ApiDataWithUniqueId[];
}

const initialState: BurgerConstructorState = {
  selectedBun: undefined,
  selectedIngredients: [],
};

interface MoveAction {
  dragIndex: number;
  hoverIndex: number;
}

interface ApiDataWithUniqueId {
  uniqueId?: string;
  ingredient: ApiData;
}

export const burgerConstructorSlice = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {
    setSelectedBun: (state, action: PayloadAction<ApiData>) => {
      state.selectedBun = action.payload;
    },
    addIngredient: (state, action: PayloadAction<ApiDataWithUniqueId>) => {
      if (action.payload.ingredient.type !== "bun") {
        state.selectedIngredients = [
          ...state.selectedIngredients,
          action.payload,
        ];
      } else {
        state.selectedBun = action.payload.ingredient;
      }
    },
    removeIngredient: (state, action: PayloadAction<number>) => {
      const result = [...state.selectedIngredients];
      result.splice(action.payload, 1);
      state.selectedIngredients = result;
    },
    moveIngredient: (state, action: PayloadAction<MoveAction>) => {
      const dragIndex = action.payload.dragIndex;
      const hoverIndex = action.payload.hoverIndex;
      const result = [...state.selectedIngredients];
      const removed = result.splice(dragIndex, 1);
      result.splice(hoverIndex, 0, ...removed);
      state.selectedIngredients = result;
    },
  },
});

export const {
  addIngredient,
  removeIngredient,
  setSelectedBun,
  moveIngredient,
} = burgerConstructorSlice.actions;

export const selectSelectedIngredients = (state: RootState) =>
  state.burgerConstructor.selectedIngredients;

export const selectSelectedBun = (state: RootState) =>
  state.burgerConstructor.selectedBun;

export default burgerConstructorSlice.reducer;
