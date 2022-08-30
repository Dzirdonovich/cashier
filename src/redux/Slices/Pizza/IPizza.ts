export interface IPizza {
  id: number;
  name: string;
  price: number;
  count: number;
  size: number;
}

export interface IPayloadPizza {
  payload: IPizza[];
}
