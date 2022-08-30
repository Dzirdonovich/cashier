import { IPizza } from "../Pizza/IPizza";

export interface IOrderPizza {
  id: number;
  name: string;
  price: number;
}
export interface IOrderDrink {
  id: number;
  name: string;
  size: number;
}
export interface ITitleOrder {
  id: number;
  number: string;
  date: string;
  name: string;
  status: string;
  price: number | string;
}

export interface ICurrentOrder {
  id: number;
  currentPrice: number;
  orderChosen: boolean;
  itemChosen: boolean;
  number: number | string;
  date: string;
  name: string;
  price: number;
  place: number;
  pizzas: IPizza[];
  drink: IOrderDrink[];
}

interface IEndPayloadOrder {
  id: number;
  number: number;
  date: string;
  name: string;
  price: number;
  place: number;
  pizzas: IPizza[];
  drink: IOrderDrink[];
}
export interface IEndOrder {
  payload: IEndPayloadOrder;
}

export interface IOrderState {
  titleOrder: ITitleOrder[];
  currentOrder: ICurrentOrder;
}
export interface IPayloadTitleOrder {
  payload: [
    {
      id: number;
      number: string;
      date: string;
      name: string;
      price: number;
      status: string;
      pizzas: IPizza[];
    }
  ];
}
