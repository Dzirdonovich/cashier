import { Link } from "react-router-dom";
// @ts-ignore
import pizzaIMG from "../../static/image/pizza.png";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { getPadTime } from "../../utils/getPadTime";
import CashierOrderItem from "../../Components/CashierOrderItem";
import ChangeItem from "../../Components/ChangeItem";
import {
  fetchOrders,
  getOrderPizza,
  postOrders,
  setLastStep,
  setOrderPizza,
  setPlaceOrder,
  setTimeOrder,
} from "../../redux/Slices/Order/orderSlice";

interface LayoutProps {
  children: React.ReactNode;
  page?: number;
  timeOrder: number;
}

const routes = [
  "/cashier/pizza",
  "/cashier/action",
  "/cashier/dessert",
  "/cashier/drink",
  "/cashier/snack",
];

function CashierPageLayout({ children, page, timeOrder }: LayoutProps) {
  const [currentPage, setCurrentPage] = useState(page);
  const [time, setTime] = useState(timeOrder);
  const [place, setPlace] = useState(0);

  const allState = useAppSelector((state) => state.order);
  const minutes: any = getPadTime(Math.floor(time / 60));
  const seconds = getPadTime(time - minutes * 60);
  const places: string[] = ["В зале", "С собой"];
  const [endPage, setEndPage] = useState(page);

  const dispatch = useAppDispatch();

  const onClickFormalizeHandler = () => {
    setEndPage(9);
    dispatch(setTimeOrder(time));
    dispatch(postOrders(allState));
    dispatch(fetchOrders());
    dispatch(setLastStep(true));
  };

  const onClickBack = () => {
    dispatch(setLastStep(false));
  };

  const onClickHandler = () => {
    console.log(allState.currentOrder.price);
    dispatch(setOrderPizza());
    dispatch(getOrderPizza());
  };
  const onclickPlaceHandler = (index: number) => {
    setPlace(index);
    dispatch(setPlaceOrder(index));
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);
  }, []);

  return (
    <div className="flex h-screen ">
      <nav className="w-1/12 bg-stone-800">
        {endPage != 9
          ? routes.map((value, index) => (
              <Link
                className={
                  currentPage === index
                    ? "mt-10 w-full h-16  flex justify-center items-center bg-blue-500"
                    : "mt-10 w-full h-16  flex justify-center items-center"
                }
                to={value}
              >
                <img className={"w-12"} src={pizzaIMG} alt={"pizza"} />
              </Link>
            ))
          : ""}
      </nav>
      <div className="w-10/12 h-screen">{children}</div>
      <div className="w-3/12 h-screen bg-slate-300 flex flex-col justify-between px-3 pt-5">
        <div className="flex flex-wrap flex-col h-1/6">
          <div className="text-black text-left w-full font-bold text-4xl">
            {allState.currentOrder.price} Р
          </div>
          <div className="text-sm w-full">{minutes + ":" + seconds}</div>
          <div className=" rounded-md bg-gray-500 w-full flex justify-between items-center overflow-hidden ">
            {places.map((value, index) => (
              <span
                onClick={() => {
                  onclickPlaceHandler(index);
                }}
                className={
                  place === index
                    ? " text-center bg-blue-500  w-1/2 px-5 py-2 cursor-pointer"
                    : "text-center  w-1/2 px-5 py-2 cursor-pointer"
                }
              >
                {value}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col h-3/5">
          {allState.settings.itemChosen ? (
            <ChangeItem pizza={allState.currentOrder.currentItem} />
          ) : (
            ""
          )}
          {allState.settings.orderChosen
            ? allState.currentOrder.pizzas.map((value) => (
                <CashierOrderItem pizza={value} />
              ))
            : ""}
        </div>
        <div className="flex h-24">
          {allState.settings.itemChosen ? (
            <button
              type="submit"
              onClick={onClickHandler}
              className=" text-center text-blue-100 w-full rounded-md bg-blue-500 m-4"
            >
              Добавить
            </button>
          ) : allState.settings.orderChosen &&
            !allState.settings.lastStepChosen ? (
            <Link
              to={"/endPage"}
              onClick={() => onClickFormalizeHandler()}
              className=" flex justify-center items-center text-center text-blue-100 w-full rounded-md bg-blue-500 m-4"
            >
              Оформление заказа
            </Link>
          ) : allState.settings.lastStepChosen &&
            allState.settings.orderChosen ? (
            <Link
              className=" flex justify-center items-center text-center text-blue-100 w-full rounded-md bg-blue-500 m-4"
              onClick={() => onClickBack()}
              to={"/cashier/pizza"}
            >
              Вернутся
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default CashierPageLayout;
