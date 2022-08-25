import CashierPageLayout from "./cashierPageLayout";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { useEffect } from "react";
import { getPizzas } from "../../redux/Slices/Pizza/pizzaSlice";

function CashierPagePizzas() {
  const pizzas = useAppSelector((state) => state.pizza);
  const dispatch = useAppDispatch();
  useEffect(() => {
    pizzas.length === 0
      ? dispatch(getPizzas()) && console.log(pizzas)
      : console.log("Ошибка при запросе пицц", pizzas);
  });

  return (
    <CashierPageLayout page={0}>
      {pizzas.map((value) => value.name)}
    </CashierPageLayout>
  );
}

export default CashierPagePizzas;
