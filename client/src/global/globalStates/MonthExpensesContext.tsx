import { createContext, ReactNode, useContext, useState } from "react";
import { MonthDataBreakDown } from "../../models/expensesCategoryWidget/pieChart";

interface MonthlyExpensesContextType {
  monthlyExpensesContext: MonthDataBreakDown[];
  setMonthlyExpensesContext: (data: any) => void;
}
// Create a new context
const MonthlyExpensesContext = createContext<
  MonthlyExpensesContextType | undefined | {}
>({});
export const useMonthExpensesContext = (): MonthlyExpensesContextType => {
  const context = useContext(MonthlyExpensesContext);
  if (!context) {
    throw new Error("no context was provided");
  }
  return context as MonthlyExpensesContextType;
};
interface Props {
  children: ReactNode;
}
export const MonthExpensesContextProvider: React.FC<Props> = ({ children }) => {
  const [state, setState] = useState<MonthDataBreakDown[]>();
  return (
    <MonthlyExpensesContext.Provider
      value={{
        monthlyExpensesContext: state,
        setMonthlyExpensesContext: setState,
      }}
    >
      {children}
    </MonthlyExpensesContext.Provider>
  );
};
