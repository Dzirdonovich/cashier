export interface IPizza {
  id: number;
  name: string;
  price: number;
  count: number;
  size: number;
  xes: number;
}

export interface IPayloadPizza {
  payload: {
    pizzas: IPizza[];
  };
}
