import { PropsIPizza } from "./cashierItem";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { setCountPizza, setOrderPrice } from "../redux/Slices/Order/orderSlice";
import { IPizza } from "../redux/Slices/Pizza/IPizza";

function CashierOrderItem({ pizza }: PropsIPizza) {
  const state = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const onClickPlus = (pizza: IPizza) => {
    console.log(state.order.currentOrder.pizzas);
    dispatch(setOrderPrice({ action: "PLUS", ...pizza }));
    dispatch(setCountPizza({ action: "PLUS", ...pizza }));
  };
  const onClickMinus = (pizza: IPizza) => {
    dispatch(setOrderPrice({ action: "MINUS", ...pizza }));
    dispatch(setCountPizza({ action: "MINUS", ...pizza }));
  };
  return (
    <div className="flex  justify-between ">
      <div>
        <div className="">{pizza.name + " " + pizza.size}</div>
        <div>Цена: {pizza.price * pizza.xes * pizza.count} Р</div>
      </div>
      <div>
        <button onClick={() => onClickPlus(pizza)}>+</button>
        <div>{pizza.count}</div>
        <button onClick={() => onClickMinus(pizza)}>-</button>
      </div>
    </div>
  );
}

export default CashierOrderItem;
