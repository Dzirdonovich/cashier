import React from "react";
import { Route, Routes } from "react-router-dom";
import StartPage from "./Pages/StartPage";
import EndPage from "./Pages/EndPage";
// @ts-ignore
import CashierPageAction from "./Pages/cashierPageCategory/CashierPageAction";
import CashierPageDessert from "./Pages/cashierPageCategory/CashierPageDessert";
import CashierPageDrink from "./Pages/cashierPageCategory/CashierPageDrink";
import CashierPagePizzas from "./Pages/cashierPageCategory/CashierPagePizzas";
import CashierPageSnack from "./Pages/cashierPageCategory/CashierPageSnack";
function App() {
  return (
    <div className="w-screen h-screen bg-gray-500">
      <Routes>
        <Route path={"/"} element={<StartPage />} />
        <Route path={"/endPage"} element={<EndPage />} />
        <Route path={"/cashier/action"} element={<CashierPageAction />} />
        <Route path={"/cashier/dessert"} element={<CashierPageDessert />} />
        <Route path={"/cashier/drink"} element={<CashierPageDrink />} />
        <Route path={"/cashier/pizza"} element={<CashierPagePizzas />} />
        <Route path={"/cashier/snack"} element={<CashierPageSnack />} />
      </Routes>
    </div>
  );
}

export default App;
