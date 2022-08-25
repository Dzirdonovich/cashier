export interface IOrderPizza {
  id: number;
  name: string;
  size: number;
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
  number: string;
  date: string;
  name: string;
  price: number | string;
  place: number;
  pizzas: IOrderPizza[];
  drink: IOrderDrink[];
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
      price: number | string;
      status: string;
    }
  ];
}
