import { MonthDataBreakDown } from "../../models/expensesCategoryWidget/pieChart";
import { CategoriesObj } from "../../models/models";
import { getMonthsList } from "../../global/date/dateToday";
import { FetchRequest } from "../useFetch";
import { buildCategoryMonthlyExpenses } from "./format/buildCategoryMonthlyExpenses";
import { Expense } from "../../models/fetch/expense";

export const getMonthData = async (
  categories: CategoriesObj[]
): Promise<MonthDataBreakDown[]> => {
  const monthsName = getMonthsList(6, "MMMM").reverse();
  const monthsDate = getMonthsList(6, "yyyy/MM/01").reverse();

  const monthExpensePromises = monthsName.map(async (month, i) => {
    const lowerBoundDate = monthsDate[i];
    const upperBoundCondition = i < monthsDate.length - 1 ? `&date[lt]=${monthsDate[i + 1]}` : "";
    const request = new FetchRequest<Expense[]>(`expenses?date[gte]=${lowerBoundDate}${upperBoundCondition}&category[ne]=0&page_size=100`, []);

    await request.fetchData();
    // await request.fetchWithCach(`expenses-${lowerBoundDate}`);
    
    return {
      month,
      expenses: request.response.status === 1 || !request.response.data ? [] : request.response.data,
    };
  });

  const monthlyExpenses = await Promise.all(monthExpensePromises);
  return buildCategoryMonthlyExpenses(monthlyExpenses, categories);
};
