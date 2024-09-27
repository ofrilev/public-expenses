import { Pagination } from "./pagination";
export type MonthlyProgress = {
  category: string;
  date: string;
  goal_amount: number;
  currentAmount: number;
  id: number;
};
export type MonthlyProgresess = {
  monthlyProgresess: MonthlyProgress[];
  pagination: Pagination;
};
