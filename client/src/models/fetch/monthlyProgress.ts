import { Pagination } from "./pagination";

export type MonthlyProgres = {
  month: string;
  goal_amount: number;
  currentAmount: number;
  categoryBreakDown: CategoriesBreakDown[];
};
export type CategoriesBreakDown = {
  category: string;
  goal_amount: number;
  currentAmount: number;
  subcategoriesBreakDown: SubcategoriesBreakDown[];
};
export type SubcategoriesBreakDown = {
  subcategory: string;
  id: number;
  categoryId: number;
  goal_amount: number;
  currentAmount: number;
};
export type ProgressBreakDown = {
  category: string;
  date: string;
  goal_amount: number;
  currentAmount: number;
  id: number;
};

export type FetchedMonthlyProgress = {
  [date: string]: ProgressBreakDown[];
};
export type FetchedMonthlyProgressObject = {
  monthly_progress: FetchedMonthlyProgress;
  pagination: Pagination;
};
