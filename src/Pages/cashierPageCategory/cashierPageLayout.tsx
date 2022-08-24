import { Link } from "react-router-dom";
// @ts-ignore
import pizzaIMG from "../../static/image/pizza.png";
import { useState } from "react";

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
  console.log(currentPage);
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
      <div className="w-3/12 h-screen bg-slate-300"></div>
    </div>
  );
}

export default CashierPageLayout;
