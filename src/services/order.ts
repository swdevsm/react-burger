import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import { Order } from "../components/order-details/OrderDetails.types";

interface OrderState {
  order?: Order | null;
}

const initialState: OrderState = {
  order: null,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action: PayloadAction<Order>) => {
      state.order = action.payload;
    },
  },
});

export const { setOrder } = orderSlice.actions;

export const selectOrder = (state: RootState) => state.order.order;

export default orderSlice.reducer;
