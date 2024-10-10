import { FC, useEffect, useState } from "react";
import { PageWrapper } from "./StyledComponents";
import { Dashboard } from "./Dashboard/Dashboard";
import { MonthlyProgressLoaderComponent } from "./MonthlyProgress/CategoriesBudget/LoaderComponent";
import { DashboardLoaderComponent } from "./Dashboard/LoaderComponent";
import { MonthlyProgres } from "../models/fetch/monthlyProgress";
import { MonthlyProgress } from "./MonthlyProgress/MonthlyProgress";
import { MonthDataBreakDown } from "../models/expensesCategoryWidget/pieChart";
import {
  fetchMonthlyData,
  fetchMonthlyProgress,
  RootState,
} from "../global/globalStates/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useCategoriesContext } from "../global/globalStates/CategoriesContext";
export const DashboardPage: FC = () => {
  const { categoriesContext } = useCategoriesContext();
  const loading = useSelector((state: RootState) => state?.data?.loading);
  const monthlyExpenses = useSelector(
    (state: RootState) => state?.data?.data?.monthlyExpenses
  );
  const dispatch = useDispatch();
  const [monthlyExpensesData, setMonthlyExpensesData] = useState<
    MonthDataBreakDown[]
  >(monthlyExpenses ?? []);
  useEffect(() => {
    if (!monthlyExpenses) {
      dispatch(fetchMonthlyData(categoriesContext.Categories));
    }
  }, [dispatch, monthlyExpenses]);

  useEffect(() => {
    if (monthlyExpenses && monthlyExpenses.length > 0) {
      setMonthlyExpensesData(monthlyExpenses);
    }
  }, [loading, monthlyExpenses]);
  return (
    <PageWrapper>
      {monthlyExpensesData?.length && !loading ? (
        <Dashboard monthlyExpenses={monthlyExpensesData} />
      ) : (
        <DashboardLoaderComponent />
      )}
    </PageWrapper>
  );
};

export const MonthlyProgressPage: FC = () => {
  const { categoriesContext } = useCategoriesContext();
  const dispatch = useDispatch();
  const { monthlyProgress } = useSelector(
    (state: RootState) => state.data.data
  );
  const { loading } = useSelector((state: RootState) => state.data);
  const [monthlyProgressData, setMonthlyProgressData] = useState<
    MonthlyProgres[]
  >(monthlyProgress ?? []);

  useEffect(() => {
    if (!monthlyProgress) {
      dispatch(fetchMonthlyProgress(categoriesContext.Categories));
    }
  }, [dispatch, monthlyProgress]);

  useEffect(() => {
    if (monthlyProgress && monthlyProgress.length > 0) {
      setMonthlyProgressData(monthlyProgress);
    }
  }, [loading, monthlyProgress]);
  return (
    <PageWrapper>
      {monthlyProgressData?.length && !loading ? (
        <MonthlyProgress monthlyProgress={monthlyProgressData} />
      ) : (
        <MonthlyProgressLoaderComponent />
      )}
    </PageWrapper>
  );
};

// ExpensesTable Component
export const ExpensesTable: FC = () => {
  return <PageWrapper>ExpensesTable</PageWrapper>;
};

// NoPage Component (404)
export const NoPage: FC = () => {
  return <h1>404 Sorry mate...</h1>;
};
