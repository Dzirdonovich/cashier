import { Link } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

function CashierPageLayout({ children }: LayoutProps) {
  return (
    <div className="flex ">
      <nav>
        <Link to={"cashier/action"} />
        <Link to={"cashier/pizza"} />
        <Link to={"cashier/snack"} />
        <Link to={"cashier/drink"} />
        <Link to={"cashier/desert"} />
      </nav>
      <div>{children}</div>
      <div></div>
    </div>
  );
}

export default CashierPageLayout;
