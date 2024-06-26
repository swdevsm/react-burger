import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "../services/ingredients";
import burgerConstructorReducer from "../services/burgerConstructor";
import orderReducer from "../services/order";
import ingredientDetailsReducer from "../services/ingredientDetails";
import passwordResetReducer from "../services/resetPassword";
import passwordResetActionReducer from "../services/resetPasswordAction";
import registerReducer from "../services/register";
import loginReducer from "../services/login";
import logoutReducer from "../services/logout";
import userReducer from "../services/user";
import updateUserReducer from "../services/updateUser";
import refreshTokenReducer from "../services/refreshToken";

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    ingredientDetails: ingredientDetailsReducer,
    order: orderReducer,
    passwordReset: passwordResetReducer,
    passwordResetAction: passwordResetActionReducer,
    register: registerReducer,
    login: loginReducer,
    logout: logoutReducer,
    user: userReducer,
    updateUser: updateUserReducer,
    refreshToken: refreshTokenReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
