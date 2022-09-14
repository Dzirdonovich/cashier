import CashierPageLayout from "./cashierPageCategory/cashierPageLayout";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import React, { ChangeEvent, useState } from "react";
import InputMask from "react-input-mask";
import {
  postOrders,
  setNameState,
  setTelephoneState,
} from "../redux/Slices/Order/orderSlice";

function EndPage() {
  const time = useAppSelector((state) => state.order.currentOrder.timeOrder);
  const state = useAppSelector((state) => state);
  const [currentInput, setCurrentInput] = useState(0);
  const [telephone, setTelephone] = useState<string>();
  const [name, setName] = useState("");
  const [price, setPrice] = useState<string>("");
  const dispatch = useAppDispatch();
  const onClick = (e: ChangeEvent<HTMLInputElement>) => {
    setTelephone(e.target.value);
  };

  const onClickInput = (index: number) => {
    setCurrentInput(index);
  };
  let currentTelephone = "0";
  let currentPrice = "";
  const onClickTelephone = (value: string) => {
    telephone !== undefined
      ? (currentTelephone = telephone + value)
      : (currentTelephone = value);
    setTelephone(currentTelephone);
    dispatch(setTelephoneState(telephone));
  };

  const onClickName = (value: string) => {
    price !== undefined
      ? (currentPrice = price + value)
      : (currentPrice = value);
    setPrice(currentPrice);
    dispatch(setNameState(name));
  };

  const onClickMinusTelephone = () => {
    const newTelephone = telephone?.slice(0, -1);
    setTelephone(newTelephone);
  };
  const onClickMinusPrice = () => {
    const newPrice = price?.slice(0, -1);
    setPrice(newPrice);
  };

  const onClickButtonCash = () => {
    dispatch(postOrders(state.order));
  };
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "00", "0"];
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
                onChange={(e) => {
                  onClick(e);
                  dispatch(setTelephoneState(e));
                }}
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
                onChange={(e) => {
                  setName(e.target.value);
                  dispatch(setNameState(e.target.value));
                  console.log(state.order.currentOrder.name);
                }}
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
                onChange={(e) => setPrice(e.target.value)}
                value={price}
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
            {currentInput === 0
              ? numbers.map((value) => (
                  <button
                    onClick={() => onClickTelephone(value)}
                    className="p-10 bg-gray-400 rounded-md h-[24.8%] w-[32%] ml-1"
                  >
                    {value}
                  </button>
                ))
              : currentInput === 2
              ? numbers.map((value) => (
                  <button
                    onClick={() => onClickName(value)}
                    className="p-10 bg-gray-400 rounded-md h-[24.8%] w-[32%] ml-1"
                  >
                    {value}
                  </button>
                ))
              : ""}
            {currentInput === 0 ? (
              <button
                onClick={() => onClickMinusTelephone()}
                className="p-10 bg-gray-400 rounded-md h-[24.8%] w-[32%] ml-1"
              >
                x
              </button>
            ) : currentInput === 2 ? (
              <button
                onClick={() => onClickMinusPrice()}
                className="p-10 bg-gray-400 rounded-md h-[24.8%] w-[32%] ml-1"
              >
                x
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
        <div>
          <button
            onClick={() => onClickButtonCash()}
            className="mt-5 px-4 py-2 rounded-md bg-gray-400"
          >
            Наличными
          </button>
        </div>
      </div>
    </CashierPageLayout>
  );
}

export default EndPage;
