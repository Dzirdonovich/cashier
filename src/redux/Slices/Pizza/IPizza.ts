export interface IPizza {
  id: number;
  name: string;
  price: number;
}

export interface IPayloadPizza {
  payload: IPizza[];
}
