import { FC, useEffect, useState } from "react";
import "./App.css";
// import ExpensesChart from "./components/BarChart";
//@ts-ignore
import ExpensesByCategory from "./components/ExpensesCategoryWidget/ExpensesByCategory";
import ModalPopupContainer from "./components/EmptyBusinessModal/ModalContainer";
import { FetchService } from "./utils/FetchService";
import ExpensesChart from "./components/BarChart";
import { MonthlyProgressWidgetWrapper } from "./components/MonthlyProgress/MonthlyProgressWidgetWrapper";
import { useCategoriesContext } from "./components/categoriesContext/CategoriesContext";
import { fetchData } from "./utils/useFetch";
// import { MonthlyProgressWidgetWrapper } from "./components/MonthlyProgress/MonthlyProgressWidgetWrapper";
// import ExpensesChart from "./components/BarChart";
const App: FC = () => {
  const { categoriesContext} = useCategoriesContext();


  const [month, setMonth] = useState<string>("");
  const {
    nullExpensesCategories,
    monthData,
    fetchAndSetNullExpensesCategories,
    monthProgressObj,
    monthDataBreakdown,
  } = FetchService();
  const onMonthSelection = (result: any) => {
    setMonth(result.name);
  };
  // const progresBarRender = ProgressBar({value: 31, totalValue: 100})

  return (
    <div className="App">
      <span className="heading">Expensify</span>
      <div>
        {!monthData ? (
          //  ||
          !monthDataBreakdown || (
            // !expensesList
            <p>Loading...</p>
          )
        ) : (
          <>
            {nullExpensesCategories?.length > 0 &&
              categoriesContext?.Categories.length > 0 && (
                <ModalPopupContainer
                  fetchAndSetNullExpensesCategories={
                    fetchAndSetNullExpensesCategories
                  }
                  initialState={nullExpensesCategories}
                />
              )}
            <div className="grid-container">
              <ExpensesChart data={monthData} onSelection={onMonthSelection} />
              {monthDataBreakdown && (
                <ExpensesByCategory data={monthDataBreakdown} />
              )}
              {/* <ExpensesTable data={expensesList[month][]}/> */}
              {/* {month && ( */}
              {/* <MonthlyProgressWidgetWrapper
                monthlyProgressData={monthProgressObj}
              /> */}
              {/* )} */}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
