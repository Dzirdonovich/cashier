import OrderItem from "../Components/OrderItem";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import {
  fetchOrders,
  setAVGPrice,
  setOrders,
} from "../redux/Slices/Order/orderSlice";
import { RootState } from "../redux/store";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getPizzas } from "../redux/Slices/Pizza/pizzaSlice";

function StartPage() {
  const orders = useAppSelector((state: RootState) => state.order);
  const pizzas = useAppSelector((state: RootState) => state.pizza);
  const settings = useAppSelector((state) => state.order.settings);
  const dispatch = useAppDispatch();
  dispatch(setAVGPrice());
  dispatch(setOrders());
  useEffect(() => {
    orders.titleOrder.length === 0
      ? dispatch(fetchOrders()) && console.log(orders, orders.titleOrder)
      : console.log("Ошибка при  запросе заказов");
    pizzas.length === 0
      ? dispatch(getPizzas()) && console.log(pizzas)
      : console.log("Ошибка при  запросе пицц", orders.titleOrder);
  }, [dispatch, pizzas, orders]);

  return (
    <div className="p-2 w-full h-full flex justify-between ">
      <div className=" w-4/5 pr-2 flex flex-col  ">
        <div className="flex justify-between">
          <div className="font-bold text-4xl">Последние</div>
          <div className="flex justify-between">
            <div className="flex flex-col px-2 py-1 text-center">
              <span className="font-medium">Заказов</span>
              <span className="font-bold">{settings.orders}</span>
            </div>
            <div className="flex flex-col px-2 py-1 text-center">
              <span className="font-medium">Средний чек</span>
              <span className="font-bold">
                {Math.floor(settings.AVGPrice)} Р
              </span>
            </div>
            <div className="flex flex-col px-2 py-1 text-center">
              <span className="font-medium">Сркеднее время ожидания</span>
              <span className="font-bold">00:30</span>
            </div>
          </div>
        </div>
        <div className="flex  box-border  flex-wrap">
          {orders.titleOrder.map((value) => (
            <OrderItem key={"key" + value.id} date={value} />
          ))}
        </div>
        <div></div>
      </div>
      <Link
        to={"/cashier/pizza"}
        className="flex justify-center items-center bg-blue-600 h-full w-1/5 rounded-md "
      >
        <span className="w-1/3 h-1/3 text-9xl text-white flex justify-center items-center">
          +
        </span>
      </Link>
    </div>
  );
}

export default StartPage;
