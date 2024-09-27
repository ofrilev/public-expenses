import { MonthDataBreakDown } from "../../models/expensesCategoryWidget/pieChart";
import { CategoriesObj } from "../../models/models";
import { GetMonthData } from "./categoryData";

export const GetMonthBreakDown = async (
  categories: CategoriesObj[]
): Promise<MonthDataBreakDown> => {
  const res = await GetMonthData(categories);
  return res;
};
