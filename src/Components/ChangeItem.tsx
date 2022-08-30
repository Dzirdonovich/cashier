import { PropsIPizza } from "./cashierItem";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { setCurrentPizzaPrice } from "../redux/Slices/Order/orderSlice";

function ChangeItem({ pizza }: PropsIPizza) {
  const sizes: number[] = [25, 30, 35];
  const xes: number[] = [1, 1.5, 2];
  const [currentPrice, setCurrentPrice] = useState(0);
  const [currentSize, setCurrentSize] = useState(0);

  const currentOrder = useAppSelector((state) => state.order.currentOrder);
  const dispatch = useAppDispatch();
  const onClickHandler = (index: number) => {
    setCurrentSize(index);
    console.log(currentOrder);
  };
  useEffect(() => {
    dispatch(setCurrentPizzaPrice(currentPrice));
  });
  return (
    <div className="flex flex-col ">
      <span className="text-center font-bold">{pizza.name}</span>
      <div className="text-center mt-8 ">Настроить состав</div>
      <div className="flex flex-col е">
        Размер
        <div className="flex justify-between text-center rounded-md overflow-hidden mt-4">
          {sizes.map((value, index) => (
            <div
              onClick={() => onClickHandler(index)}
              className={
                currentSize === index
                  ? "bg-blue-500 w-1/3"
                  : "bg-gray-500 w-1/3 cursor-pointer"
              }
            >
              {
                <div>
                  <div className="font-semibold font-black text-3xl">
                    {value}
                  </div>

                  <div
                    onClick={() => {
                      setCurrentPrice(currentOrder.currentPrice * xes[index]);
                    }}
                  >
                    {currentOrder.currentPrice * xes[index]} Р
                  </div>
                </div>
              }
            </div>
          ))}
        </div>
        <div className=""></div>
      </div>
    </div>
  );
}
export default ChangeItem;
