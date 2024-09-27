import { useState, useEffect } from "react";
import { useCategoriesContext } from "../global/globalStates/CategoriesContext";
import { GetMonthBreakDown } from "../utils/fetch/getExpensesBreakDown";
import { MonthDataBreakDown } from "../models/expensesCategoryWidget/pieChart";
import { MonthlyProgres } from "../models/fetch/monthlyProgress";
import { GetMonthlyProgress } from "../utils/fetch/getMonthlyProgress";

export const usePrefetch = () => {
  const { categoriesContext } = useCategoriesContext();
  const [fetching, setFetching] = useState(false);
  const [categoriesMonthlyExpenses, setCategoriesMonthlyExpenses] =
    useState<MonthDataBreakDown>();

  const [monthlyProgress, setMonthlyProgress] = useState<MonthlyProgres[]>();

  useEffect(() => {
    const fetchDataAsync = async () => {
      setFetching(true);
      const monthBreakdownData = await GetMonthBreakDown(
        categoriesContext.Categories
      );
      setCategoriesMonthlyExpenses(monthBreakdownData);
      const monthlyProgressData = await GetMonthlyProgress(
        categoriesContext.Categories
      );
      setMonthlyProgress(monthlyProgressData);
      setFetching(false);
    };
    fetchDataAsync();
  }, []);

  return { categoriesMonthlyExpenses, monthlyProgress, fetching };
};
