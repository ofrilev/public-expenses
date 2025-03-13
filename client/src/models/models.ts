export interface Todo {
  id: number;
  todo: string;
  isDone: boolean;
}

interface ExpenseDetail {
  date: string;
  amount: number;
  id: number;
}

export interface BusinessExpense {
  business_name: string;
  breakDown: ExpenseDetail[];
}

export type CategoriesObj = {
  category: string;
  id: number;
  parent: number | null;
};
