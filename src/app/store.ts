import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "../services/ingredients";
import burgerConstructorReducer from "../services/burgerConstructor";
import orderReducer from "../services/order";
import ingredientDetailsReducer from "../services/ingredientDetails";
import { combineReducers } from "redux";

export const store = configureStore({
  reducer: combineReducers({
    ingredients: ingredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    ingredientDetails: ingredientDetailsReducer,
    order: orderReducer,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
