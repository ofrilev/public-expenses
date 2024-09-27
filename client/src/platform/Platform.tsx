import { Wrapper } from "./StyledComponents";
import { SideBar } from "../components/sideBar/SideBar";
import {
  NoPage,
  DashboardPage,
  ExpensesTable,
  MonthlyProgressPage,
} from "../Pages/Page";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { FC, Suspense, useEffect, useState } from "react"; // Import Suspense
import { useCategoriesContext } from "../global/globalStates/CategoriesContext";
import { GetMonthBreakDown } from "../utils/fetch/getExpensesBreakDown";
import { GetMonthlyProgress } from "../utils/fetch/getMonthlyProgress";
import { MonthlyProgres } from "../models/fetch/monthlyProgress";

import { GetMonthData } from "../utils/fetch/categoryData";
import { MonthDataBreakDown } from "../models/expensesCategoryWidget/pieChart";
import { useMonthExpensesContext } from "../global/globalStates/MonthExpensesContext";

export const Platform: FC = () => {
  return (
    <Wrapper id="wrapper">
      <BrowserRouter basename="/app">
        <SideBar />
        {/* <Suspense fallback={<div>Loading Application...</div>}> */}
        <Routes>
          <Route path="/" element={<Navigate to="dashboard" />} />
          <Route path="/*" element={<AppLayout />} />
        </Routes>
        {/* </Suspense> */}
      </BrowserRouter>
    </Wrapper>
  );
};

// AppLayout: Handles page-level routing
const AppLayout: FC = () => {
  const { categoriesContext } = useCategoriesContext();
  const { monthlyExpensesContext, setMonthlyExpensesContext } =
    useMonthExpensesContext();
  const [monthlyProgress, setMonthlyProgress] = useState<MonthlyProgres[]>();
  useEffect(() => {
    const fetchDataAsync = async () => {
      const monthBreakdownData = await GetMonthData(
        categoriesContext.Categories
      );
      setMonthlyExpensesContext(monthBreakdownData);
      const monthlyProgressData = await GetMonthlyProgress(
        categoriesContext.Categories
      );
      setMonthlyProgress(monthlyProgressData);
    };
    fetchDataAsync();
  }, []);
  return (
    <Routes>
      <Route
        path="dashboard"
        element={<DashboardPage monthlyExpenses={monthlyExpensesContext} />}
      />
      <Route
        path="monthly_expense"
        element={<MonthlyProgressPage monthlyProgress={monthlyProgress} />}
      />
      <Route path="expenses_table" element={<ExpensesTable />} />
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
};
