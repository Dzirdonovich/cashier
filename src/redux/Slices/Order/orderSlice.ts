import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IOrderState, IPayloadTitleOrder } from "./IOrder";
import { getPadTime } from "../../../utils/getPadTime";

const initialState: IOrderState = {
  titleOrder: [],
  currentOrder: {
    orderChosen: false,
    itemChosen: false,
    currentPrice: 0,
    id: 0,
    number: 0,
    date: "",
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
export const postOrders: any = createAsyncThunk(
  "orders/postOrders",

  async (state: IOrderState) => {
    const { orderChosen, itemChosen, currentPrice, ...order } =
      state.currentOrder;
    order.number =
      state.titleOrder.length +
      "-" +
      (state.currentOrder.pizzas.length + state.currentOrder.drink.length);
    order.date =
      getPadTime(new Date(Date.now()).getHours()).toString() +
      ":" +
      getPadTime(new Date(Date.now()).getMinutes()).toString();
    order.name = "кто-то";
    order.pizzas.forEach((value) => {
      order.price += value.price;
    });

    const { data } = await axios.post("http://localhost:3001/orders", order);
    console.log(data);
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setPlaceOrder(state, { payload }) {
      state.currentOrder.place = payload;
    },
    setOrderChosen(state, { payload }) {
      state.currentOrder.orderChosen = payload;
    },
    setOrderPizza(state, { payload }) {
      state.currentOrder.pizzas.push(payload);
    },
    setItemOrder(state, { payload }) {
      console.log(payload);
      state.currentOrder.itemChosen = payload;
    },

    setCurrentPizzaPrice(state, { payload }) {
      state.currentOrder.pizzas[state.currentOrder.pizzas.length - 1].price =
        payload;
    },
    setCurrentPrice(state, { payload }) {
      state.currentOrder.currentPrice = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchOrders.fulfilled,
      (state: IOrderState, { payload }: IPayloadTitleOrder) => {
        state.titleOrder = [];
        payload.map((value) => {
          state.titleOrder.push(value);
        });
      }
    );
    // builder.addCase(
    //   postOrders.fulfilled,
    //   (state: IOrderState, { payload }: IPayloadTitleOrder) => {
    //     payload[payload.length - 1].number =
    //       payload[payload.length - 1].id.toString() +
    //       "-" +
    //       payload[payload.length - 1].pizzas.length;
    //   }
    // );
  },
});

export const {
  setOrderChosen,
  setOrderPizza,
  setItemOrder,
  setCurrentPizzaPrice,
  setPlaceOrder,
  setCurrentPrice,
} = orderSlice.actions;
