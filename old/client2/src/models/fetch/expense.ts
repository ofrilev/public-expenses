import { Pagination } from "./pagination";

export type Expenses = {
  pagination: Pagination;
  expenses: Expense[];
};
export type Expense = {
  amount: number;
  business_name: string;
  card_number: number;
  category: number;
  date: string;
  id: number;
  special: number;
};
