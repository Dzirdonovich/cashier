import OrderItem from "../Components/OrderItem";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, OrderState } from "../redux/Slices/orderSlice";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { log } from "util";

function StartPage() {
  const orders = useSelector((state: RootState) => state.order);
  const [order, setOrder] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    orders.length === 0 ? dispatch(fetchOrders()) : console.log(orders);
  }, []);

  return (
    <div className="p-2 w-full h-full flex justify-between ">
      <div className=" w-4/5 pr-2 flex flex-col justify-between ">
        <div className="flex justify-between">
          <div className="font-bold text-4xl">Последние</div>
          <div className="flex justify-between">
            <div className="flex flex-col px-2 py-1 text-center">
              <span className="font-medium">Заказов</span>
              <span className="font-bold">150</span>
            </div>
            <div className="flex flex-col px-2 py-1 text-center">
              <span className="font-medium">Средний чек</span>
              <span className="font-bold">590 Р</span>
            </div>
            <div className="flex flex-col px-2 py-1 text-center">
              <span className="font-medium">Сркеднее время ожидания</span>
              <span className="font-bold">00:30</span>
            </div>
          </div>
        </div>
        <div className="flex justify-between flex-wrap ">
          {orders.map((value, index) => (
            <OrderItem key={"key" + value.id} date={value} />
          ))}
        </div>
        <div></div>
      </div>
      <Link
        to={"/cashier/action"}
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
