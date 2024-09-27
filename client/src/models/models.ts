import { Pagination } from "./fetch/pagination";

export interface Todo {
  id: number;
  todo: string;
  isDone: boolean;
}

//null expenses:

interface ExpenseDetail {
  date: string;
  amount: number;
  id: number;
}

export interface BusinessExpense {
  business_name: string;
  breakDown: ExpenseDetail[];
}

export type CategoriesObjArr = {
  Pagination: Pagination;
  Categories: CategoriesObj[];
};
export type CategoriesObj = {
  category: string;
  id: number;
  parent: number | null;
};
