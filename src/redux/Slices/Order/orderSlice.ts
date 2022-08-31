import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IOrderState, IPayloadTitleOrder } from "./IOrder";
import { getPadTime } from "../../../utils/getPadTime";

const initialState: IOrderState = {
  titleOrder: [],
  currentOrder: {
    orderChosen: false,
    itemChosen: false,
    timeOrder: 0,
    currentItem: {
      id: 0,
      price: 0,
      name: "",
      count: 1,
      size: 0,
      xes: 0,
    },
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
    const { orderChosen, itemChosen, currentItem, ...order } =
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

    const { data } = await axios.post("http://localhost:3001/orders", order);

    console.log(data);
    state.titleOrder = [];
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
    setOrderPizza(state) {
      state.currentOrder.price =
        state.currentOrder.price +
        state.currentOrder.currentItem.price *
          state.currentOrder.currentItem.xes;
      state.currentOrder.pizzas.push({
        ...state.currentOrder.currentItem,
        count: 1,
      });
    },

    setOrderPrice(state, { payload }) {
      payload.action === "MINUS"
        ? (state.currentOrder.price -= payload.price * payload.xes)
        : (state.currentOrder.price += payload.price * payload.xes);
    },

    setItemOrder(state, { payload }) {
      console.log(payload);
      state.currentOrder.itemChosen = payload;
    },
    setCountPizza(state, { payload }) {
      console.log(payload);
      payload.action === "MINUS"
        ? state.currentOrder.pizzas.filter(
            (value) =>
              value.name === payload.name && value.size === payload.size
          )[0].count--
        : state.currentOrder.pizzas.filter(
            (value) =>
              value.name === payload.name && value.size === payload.size
          )[0].count++;
    },

    setCurrentItem(state, { payload }) {
      state.currentOrder.currentItem = payload;
      console.log(state.currentOrder.currentItem);
    },
    setItemSize(state, { payload }) {
      state.currentOrder.currentItem.size = payload;
    },
    setItemXes(state, { payload }) {
      state.currentOrder.currentItem.xes = payload;
    },

    getOrderPizza(state) {
      state.currentOrder.itemChosen = false;
      state.currentOrder.orderChosen = true;
    },
    hideOrder(state) {
      state.currentOrder.itemChosen = true;
      state.currentOrder.orderChosen = false;
    },
    setTimeOrder(state, { payload }) {
      state.currentOrder.timeOrder = payload;
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
  setItemSize,
  setCurrentItem,
  setOrderPizza,
  setItemOrder,
  setPlaceOrder,
  getOrderPizza,
  setItemXes,
  hideOrder,
  setCountPizza,
  setOrderPrice,
  setTimeOrder,
} = orderSlice.actions;
