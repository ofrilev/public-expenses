export interface CategoryMonthlyExpenses {
  [month: string]: {
    monthlyData: MonthlyData;
    totalAmount: number;
  };
}
export interface MonthlyData {
  [category: string]: {
    categoryMonthData: CategoryMonthData;
    totalAmount: number;
  };
}
export interface CategoryMonthData {
  [subCategory: string]: {
    subCategoryMonthData: SubCategoryMonthData;
    totalAmount: number;
  };
}
export interface SubCategoryMonthData {
  [business_name: string]: {
    business_nameMonthData: Expense[];
    totalAmount: number;
  };
}
export interface Expense {
  date: string;
  amount: number;
}
