import CashierPageLayout from "./cashierPageLayout";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { useEffect } from "react";
import { getPizzas } from "../../redux/Slices/Pizza/pizzaSlice";
import CashierItem from "../../Components/cashierItem";

function CashierPagePizzas() {
  const pizzas = useAppSelector((state) => state.pizza);
  const dispatch = useAppDispatch();
  useEffect(() => {
    pizzas.length === 0
      ? dispatch(getPizzas()) && console.log(pizzas)
      : console.log("Ошибка при запросе пицц", pizzas);
  });

  return (
    <CashierPageLayout timeOrder={0} page={0}>
      <div className="flex flex-wrap justify-between p-10">
        {pizzas.map((value) => (
          <CashierItem pizza={value} />
        ))}
      </div>
    </CashierPageLayout>
  );
}

export default CashierPagePizzas;
