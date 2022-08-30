import { IPizza } from "../redux/Slices/Pizza/IPizza";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import {
  setCurrentPrice,
  setItemOrder,
  setOrderPizza,
} from "../redux/Slices/Order/orderSlice";
export interface PropsIPizza {
  pizza: IPizza;
}

function CashierItem({ pizza }: PropsIPizza) {
  const dispatch = useAppDispatch();
  const pizzas = useAppSelector((state) => state.pizza);
  const cashierItemHandler = (price: number) => {
    dispatch(setItemOrder(true));
    dispatch(setOrderPizza(pizzas[pizza.id]));
    dispatch(setCurrentPrice(price));
  };

  return (
    <div
      onClick={() => cashierItemHandler(pizza.price)}
      className=" cursor-pointer flex w-1/6 flex-col justify-between p-2 bg-white rounded-md h-24"
    >
      <div>{pizza.name}</div>
      <div>{pizza.price} P</div>
    </div>
  );
}
export default CashierItem;
