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
  createdAt: string;
  id: number;
  number: string;
  pizzaOrder: IPizzaOrder[];
  place: number;
  price: number;
  time: string;
  updatedAt: string;
  name?: string;
}

export interface ICurrentOrder {
  id: number;
  timeOrder: number;

  currentItem: IPizza;
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
  settings: ISettings;
}

export interface IPizzaOrder {
  createdAt: string;
  name: string;
  OrderId: number;
  pizzaOrderId: number;
  size: number;
  updatedAt: string;
}
export interface IPayloadTitleOrder {
  payload: {
    orders: [
      {
        createdAt: string;
        id: number;
        number: string;
        pizzaOrder: IPizzaOrder[];
        place: number;
        price: number;
        time: string;
        updatedAt: string;
      }
    ];
  };
}
export interface ISettings {
  AVGPrice: number;
  orders: number;
  orderChosen: boolean;
  itemChosen: boolean;
  lastStepChosen: boolean;
}
