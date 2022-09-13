import CashierPageLayout from "./cashierPageCategory/cashierPageLayout";
import { useAppSelector } from "../hooks/reduxHook";
import { ChangeEvent, useState } from "react";
import InputMask from "react-input-mask";
import { stat } from "fs";

function EndPage() {
  const time = useAppSelector((state) => state.order.currentOrder.timeOrder);
  const state = useAppSelector((state) => state);
  const [currentInput, setCurrentInput] = useState(0);
  const [telephone, setTelephone] = useState<string>();
  const [name, setName] = useState("");
  const onClick = (e: ChangeEvent<HTMLInputElement>) => {
    setTelephone(e.target.value);
    console.log(state.order.currentOrder);
  };
  const onClickInput = (index: number) => {
    setCurrentInput(index);
  };
  return (
    <CashierPageLayout timeOrder={time} page={9}>
      <div className="px-4 h-screen">
        <div className="flex justify-between py-3">
          <span className="text-xl text-black font-bold">
            К оплате: {state.order.currentOrder.price} Р
          </span>
          <div>
            <button className="px-2 py-3 font-medium bg-white rounded-md">
              Кассир
            </button>
            <button className="px-2 py-3 font-medium bg-white rounded-md ml-2">
              Промокод
            </button>
          </div>
        </div>
        <div className="h-3/6 flex justify-between">
          <div className="w-3/5">
            <div
              className={
                currentInput === 0
                  ? "w-full bg-white  flex rounded-md overflow-hidden mb-2 h-1/4"
                  : "w-full bg-gray-400  flex rounded-md overflow-hidden mb-2 h-1/4"
              }
              onClick={() => onClickInput(0)}
            >
              <InputMask
                mask={"+7-(999)-999-99-99"}
                maskPlaceholder={"+7-(999)-999-99-99"}
                placeholder={"+7-(999)-999-99-99"}
                value={telephone}
                onChange={(e) => onClick(e)}
                className="w-11/12 bg-inherit outline-0 px-4 py-4 placeholder:text-gray-400"
              />
            </div>
            <div
              className={
                currentInput === 1
                  ? "w-full bg-white  flex rounded-md overflow-hidden mb-2 h-1/4"
                  : "w-full bg-gray-400  flex rounded-md overflow-hidden mb-2 h-1/4"
              }
              onClick={() => onClickInput(1)}
            >
              <input
                placeholder="Введите имя"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="w-11/12 bg-inherit outline-0 px-4 py-4"
                type="text"
              />
            </div>
            <div
              className={
                currentInput === 2
                  ? "py-2 px-4 w-full flex-wrap justify-between bg-white  flex rounded-md overflow-hidden mb-2 h-2/4"
                  : " py-2 px-4  w-full flex-wrap justify-between bg-gray-400  flex rounded-md overflow-hidden mb-2 h-2/4"
              }
              onClick={() => onClickInput(2)}
            >
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="w-full  bg-inherit outline-0 px-4 py-4 h-1/2"
                type="text"
              />
              <button className=" w-1/4 px-4 py-2 rounded-md bg-gray-200">
                390
              </button>
              <button className=" w-1/4 px-4 py-2 rounded-md bg-gray-200">
                300
              </button>
              <button className=" w-1/4 px-4 py-2 rounded-md bg-gray-200">
                Ровно
              </button>
            </div>
          </div>
          <div className="w-2/5 flex ml-2 flex-wrap">
            <button className="p-10 bg-gray-400 rounded-md h-1/5 w-1/4 ml-1">
              1
            </button>
            <button className="p-10 bg-gray-400 rounded-md h-1/5 w-1/4 ml-1">
              1
            </button>
            <button className="p-10 bg-gray-400 rounded-md h-1/5 w-1/4 ml-1">
              1
            </button>
            <button className="p-10 bg-gray-400 rounded-md h-1/5 w-1/4 ml-1">
              1
            </button>
            <button className="p-10 bg-gray-400 rounded-md h-1/5 w-1/4 ml-1">
              1
            </button>
            <button className="p-10 bg-gray-400 rounded-md h-1/5 w-1/4 ml-1">
              1
            </button>{" "}
            <button className="p-10 bg-gray-400 rounded-md h-1/5 w-1/4 ml-1">
              1
            </button>{" "}
            <button className="p-10 bg-gray-400 rounded-md h-1/5 w-1/4 ml-1">
              1
            </button>{" "}
            <button className="p-10 bg-gray-400 rounded-md h-1/5 w-1/4 ml-1">
              1
            </button>{" "}
            <button className="p-10 bg-gray-400 rounded-md h-1/5 w-1/4 ml-1">
              1
            </button>{" "}
            <button className="p-10 bg-gray-400 rounded-md h-1/5 w-1/4 ml-1">
              1
            </button>{" "}
            <button className="p-10 bg-gray-400 rounded-md h-1/5 w-1/4 ml-1">
              1
            </button>
          </div>
        </div>
        <div></div>
      </div>
    </CashierPageLayout>
  );
}

export default EndPage;
