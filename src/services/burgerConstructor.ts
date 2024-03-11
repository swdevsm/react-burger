import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import { ApiData } from "../ApiData.types";

interface BurgerConstructorState {
  selectedBun?: ApiData;
  selectedIngredients: ApiData[];
}

const initialState: BurgerConstructorState = {
  selectedBun: undefined,
  selectedIngredients: [],
};

interface MoveAction {
  dragIndex: number;
  hoverIndex: number;
}

export const burgerConstructorSlice = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {
    setSelectedIngredients: (state, action: PayloadAction<ApiData[]>) => {
      state.selectedIngredients = action.payload;
    },
    setSelectedBun: (state, action: PayloadAction<ApiData>) => {
      state.selectedBun = action.payload;
    },
    addIngredient: (state, action: PayloadAction<ApiData>) => {
      if (action.payload.type !== "bun") {
        state.selectedIngredients = [
          ...state.selectedIngredients,
          action.payload,
        ];
      } else {
        state.selectedBun = action.payload;
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
      // console.log(dragIndex, "->", hoverIndex);

      const result = [...state.selectedIngredients];
      // console.log(result)
      const removed = result.splice(dragIndex, 1);

      result.splice(hoverIndex, 0, ...removed);
      state.selectedIngredients = result;
    },
  },
});

export const {
  setSelectedIngredients,
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
