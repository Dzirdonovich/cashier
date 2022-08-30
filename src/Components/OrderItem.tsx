interface PropsDate {
  date: {
    id: number;
    number: string;
    date: string;
    name: string;
    status: string;
    price: number | string;
  };
}

function OrderItem({ date }: PropsDate) {
  return (
    <div className=" w-1/5  p-3 m-2  rounded-2xl bg-white flex flex-wrap ">
      <div className=" w-3/5 text-5xl bg-blue-500 text-center text-white rounded-xl">
        {date.number}
      </div>
      <div className=" w-2/5 text-right">{date.date}</div>
      <div className="w-full h-24">{date.name}</div>
      <div className=" w-3/5">{date.status}</div>
      <div className=" w-2/5 text-right">{date.price}</div>
    </div>
  );
}
export default OrderItem;
