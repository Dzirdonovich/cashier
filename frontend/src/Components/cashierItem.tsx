import { IPizza } from "../redux/Slices/Pizza/IPizza";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import {
  hideOrder,
  setCurrentItem,
  setItemOrder,
} from "../redux/Slices/Order/orderSlice";
export interface PropsIPizza {
  pizza: IPizza;
}

function CashierItem({ pizza }: PropsIPizza) {
  const dispatch = useAppDispatch();
  const pizzas = useAppSelector((state) => state.pizza);
  const state = useAppSelector((state) => state);
  const cashierItemHandler = (pizza: IPizza) => {
    dispatch(setCurrentItem({ ...pizza, count: 1 }));
    dispatch(setItemOrder(true));
    dispatch(hideOrder());
    console.log(state.order.currentOrder, pizzas);
  };

  return (
    <div
      onClick={() => cashierItemHandler(pizza)}
      className=" cursor-pointer flex w-1/6 flex-col justify-between p-2 bg-white rounded-md h-24"
    >
      <div>{pizza.name}</div>
      <div>{pizza.price} P</div>
    </div>
  );
}
export default CashierItem;
