import { IPizzaOrder } from "../redux/Slices/Order/IOrder";

interface PropsDate {
  date: {
    createdAt: string;
    id: number;
    number: string;
    pizzaOrder: IPizzaOrder[];
    place: number;
    price: number;
    time: string;
    updatedAt: string;
    name?: string;
  };
}

function OrderItem({ date }: PropsDate) {
  return (
    <div
      onClick={() => console.log(date)}
      className="  w-[23.9%] box-border  p-3 m-2 rounded-2xl bg-white flex flex-wrap "
    >
      <div className=" w-3/5 text-5xl bg-blue-500 text-center text-white rounded-xl">
        {date.number + "-" + date.pizzaOrder.length}
      </div>
      <div className=" w-2/5 text-right">{date.time}</div>
      <div className="w-full h-24">{date.name}</div>
      <div className=" w-3/5">{date.place === 1 ? "Выполняется" : "Готов"}</div>
      <div className=" w-2/5 text-right">{date.price}</div>
    </div>
  );
}
export default OrderItem;
