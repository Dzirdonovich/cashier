import { PropsIPizza } from "./cashierItem";

function CashierOrderItem({ pizza }: PropsIPizza) {
  return (
    <div className="flex  justify-between ">
      <div>
        <div className="">{pizza.name}</div>
        <div>{pizza.price}</div>
      </div>
    </div>
  );
}

export default CashierOrderItem;
