import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../redux/store";
import axios from "axios";
import { log } from "util";

export interface OrderState {
  id: number;
  number: string;
  date: string;
  name: string;
  status: string;
  price: number | string;
}
interface IPayload {
  payload: [
    {
      id: number;
      number: string;
      date: string;
      name: string;
      price: number | string;
      status: string;
    }
  ];
}

const initialState: OrderState[] = [];

export const fetchOrders: any = createAsyncThunk(
  "orders/fetchOrders",
  async () => {
    const { data } = await axios.get("http://localhost:3001/orders");
    console.log(data);
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
      (state: OrderState[], { payload }: IPayload) => {
        payload.map((value, index) => {
          value.price += " P";
          state.push(value);
        });
      }
    );
  },
});
