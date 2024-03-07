import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "../services/ingredients";
import { combineReducers } from "redux";

export const store = configureStore({
  reducer: combineReducers({
    ingredients: ingredientsReducer,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
