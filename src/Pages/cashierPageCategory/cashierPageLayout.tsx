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
  postOrders,
  setPlaceOrder,
} from "../../redux/Slices/Order/orderSlice";

interface LayoutProps {
  children: React.ReactNode;
  page: number;
}

const routes = [
  "/cashier/pizza",
  "/cashier/action",
  "/cashier/dessert",
  "/cashier/drink",
  "/cashier/snack",
];

function CashierPageLayout({ children, page }: LayoutProps) {
  const [currentPage, setCurrentPage] = useState(page);
  const [time, setTime] = useState(0);
  const [place, setPlace] = useState(0);
  const currentOrder = useAppSelector((state) => state.order.currentOrder);
  const allState = useAppSelector((state) => state.order);
  const minutes: any = getPadTime(Math.floor(time / 60));
  const seconds = getPadTime(time - minutes * 60);
  const places: string[] = ["В зале", "С собой"];
  const dispatch = useAppDispatch();

  const onClickHandler = () => {
    dispatch(postOrders(allState));
    dispatch(fetchOrders());
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
        {routes.map((value, index) => (
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
        ))}
      </nav>
      <div className="w-10/12 h-screen">{children}</div>
      <div className="w-3/12 h-screen bg-slate-300 flex flex-col justify-between px-3 pt-5">
        <div className="flex flex-wrap flex-col h-1/6">
          <div className="text-black text-left w-full font-bold text-4xl">
            {currentOrder.price} Р
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
          {currentOrder.itemChosen ? (
            <ChangeItem
              pizza={currentOrder.pizzas[currentOrder.pizzas.length - 1]}
            />
          ) : (
            ""
          )}
          {currentOrder.orderChosen
            ? currentOrder.pizzas.map((value) => (
                <CashierOrderItem pizza={value} />
              ))
            : ""}
        </div>
        <div className="flex h-24">
          <button
            type="submit"
            onClick={onClickHandler}
            className=" text-center text-blue-100 w-full rounded-md bg-blue-500 m-4"
          >
            Добавить
          </button>
        </div>
      </div>
    </div>
  );
}

export default CashierPageLayout;
