import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IPayloadPizza, IPizza } from "./IPizza";

const initialState: IPizza[] = [];

export const getPizzas: any = createAsyncThunk("Pizzas/getPizzas", async () => {
  const { data } = await axios.get("http://localhost:3001/pizzas");
  return data;
});

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getPizzas.fulfilled,
      (state: IPizza[], { payload }: IPayloadPizza) => {
        payload.map((value) => {
          state.push(value);
        });
      }
    );
  },
});
