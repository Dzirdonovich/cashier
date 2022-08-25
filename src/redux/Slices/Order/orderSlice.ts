import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IOrderState, IPayloadTitleOrder } from "./IOrder";

const initialState: IOrderState = {
  titleOrder: [],
  currentOrder: {
    id: 0,
    number: "0",
    date: "00:00",
    name: "",
    price: 0,
    place: 0,
    pizzas: [],
    drink: [],
  },
};

export const fetchOrders: any = createAsyncThunk(
  "orders/fetchOrders",
  async () => {
    const { data } = await axios.get("http://localhost:3001/orders");
    return data;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchOrders.fulfilled,
      (state: IOrderState, { payload }: IPayloadTitleOrder) => {
        payload.map((value) => {
          value.price += " P";
          state.titleOrder.push(value);
        });
      }
    );
  },
});
