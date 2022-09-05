import CashierPageLayout from "./cashierPageCategory/cashierPageLayout";
import { useAppSelector } from "../hooks/reduxHook";

function EndPage() {
  const time = useAppSelector((state) => state.order.currentOrder.timeOrder);
  return (
    <CashierPageLayout timeOrder={time} page={9}>
      d
    </CashierPageLayout>
  );
}

export default EndPage;
