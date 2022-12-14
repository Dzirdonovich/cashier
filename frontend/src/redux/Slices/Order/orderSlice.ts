import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IOrderState, IPayloadTitleOrder } from "./IOrder";

const initialState: IOrderState = {
  titleOrder: [],
  currentOrder: {
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
    number: "",
    date: "",
    name: "",
    price: 0,
    place: 0,
    pizza: [],
    drink: [],
    telephone: "",
  },
  settings: {
    AVGPrice: 0,
    orders: 0,
    orderChosen: false,
    itemChosen: false,
    lastStepChosen: false,
  },
};

export const fetchOrders: any = createAsyncThunk(
  "orders/fetchOrders",
  async () => {
    const { data } = await axios.get("http://localhost:5000/api/order");
    console.log(data);
    return data;
  }
);
export const postOrders: any = createAsyncThunk(
  "orders/postOrders",

  async (state: IOrderState) => {
    const { currentItem, id, price, date, timeOrder, number, ...order } =
      state.currentOrder;

    const { data } = await axios.post("http://localhost:5000/api/order", {
      place: order.place,
      name: order.name,
      telephone: order.telephone,
      pizza: order.pizza,
    });

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
      state.settings.orderChosen = payload;
    },
    setOrderPizza(state) {
      state.currentOrder.price =
        state.currentOrder.price +
        state.currentOrder.currentItem.price *
          state.currentOrder.currentItem.xes;
      state.currentOrder.pizza.push({
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
      state.settings.itemChosen = payload;
    },
    setCountPizza(state, { payload }) {
      console.log(payload);
      payload.action === "MINUS"
        ? state.currentOrder.pizza.filter(
            (value) =>
              value.name === payload.name && value.size === payload.size
          )[0].count--
        : state.currentOrder.pizza.filter(
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
      state.settings.itemChosen = false;
      state.settings.orderChosen = true;
    },
    hideOrder(state) {
      state.settings.itemChosen = true;
      state.settings.orderChosen = false;
    },
    setTimeOrder(state, { payload }) {
      state.currentOrder.timeOrder = payload;
    },
    setAVGPrice(state) {
      let fullPrice = 0;
      state.titleOrder.map((value) => {
        return (fullPrice += value.price);
      });
      state.settings.AVGPrice = fullPrice / state.titleOrder.length;
    },
    setOrders(state) {
      state.settings.orders = state.titleOrder.length;
    },
    setLastStep(state, { payload }) {
      state.settings.lastStepChosen = payload;
    },
    setTelephoneState(state, { payload }) {
      state.currentOrder.telephone = payload;
    },
    setNameState(state, { payload }) {
      state.currentOrder.name = payload;
    },
    setLastData(state, { payload }) {
      console.log(payload);
      state.currentOrder.name = payload.name;
      state.currentOrder.telephone = payload.telephone;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchOrders.fulfilled,
      (state: IOrderState, { payload }: IPayloadTitleOrder) => {
        state.titleOrder = [];
        console.log(payload);
        payload.orders.map((value) => {
          return state.titleOrder.push(value);
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
  setAVGPrice,
  setOrders,
  setLastStep,
  setLastData,
  setTelephoneState,
  setNameState,
} = orderSlice.actions;
