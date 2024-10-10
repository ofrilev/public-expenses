import {
  CategoryMonthlyExpenses,
  MonthDataBreakDown,
} from "../../models/expensesCategoryWidget/pieChart";
import { CategoriesObj } from "../../models/models";
import { Expense as FetchExpense } from "../../models/fetch/expense";
import { Expenses } from "../../models/fetch/expense";
import { fetchData } from "../useFetch";
import { getMonthsList } from "../../global/date/dateToday";
interface MonthExpenses {
  month: string;
  expenses: FetchExpense[];
}

export const getMonthData = async (
  categories: CategoriesObj[]
): Promise<MonthDataBreakDown[]> => {
  const monthsName = getMonthsList(6, "MMMM").reverse();
  const monthsDate = getMonthsList(6, "yyyy/MM/01").reverse();
  let me: MonthExpenses[] = [];
  for (let i = 0; i < monthsName.length; i++) {
    const res = await fetchData<Expenses>(
      `expenses?date[gte]=${monthsDate[i]}&category[ne]=0`
    );
    if (res.expenses && res.expenses.length > 0) {
      me[i] = { month: monthsName[i], expenses: res.expenses };
    }
  }
  let res = buildCategoryMonthlyExpenses(me, categories);
  return res;
};

// Create a mapping from category IDs to names and parents
const createCategoryMap = (categories: CategoriesObj[]) => {
  const categoryMap: { [id: number]: { name: string; parent: number | null } } =
    {};
  categories.forEach((category) => {
    categoryMap[category.id] = {
      name: category.category,
      parent: category.parent,
    };
  });
  return categoryMap;
};
const buildCategoryMonthlyExpenses = (
  data: MonthExpenses[],
  categories: CategoriesObj[]
): MonthDataBreakDown[] => {
  const categoryMap = createCategoryMap(categories);
  const result: CategoryMonthlyExpenses = {};

  data.forEach((item) => {
    const { month, expenses } = item;
    expenses.forEach((expense) => {
      const { category, business_name, amount } = expense;
      // Find the top-level category and subcategory names
      let categoryName = categoryMap[category].name;
      let parentCategoryId = categoryMap[category].parent;
      let subCategoryName = categoryName;
      while (parentCategoryId !== null) {
        subCategoryName = categoryName;
        categoryName = categoryMap[parentCategoryId].name;
        parentCategoryId = categoryMap[parentCategoryId].parent;
      }

      if (!result[month]) {
        result[month] = {
          monthlyData: {},
          totalAmount: 0,
        };
      }

      if (!result[month].monthlyData[categoryName]) {
        result[month].monthlyData[categoryName] = {
          categoryMonthData: {},
          totalAmount: 0,
        };
      }

      if (
        !result[month].monthlyData[categoryName].categoryMonthData[
          subCategoryName
        ]
      ) {
        result[month].monthlyData[categoryName].categoryMonthData[
          subCategoryName
        ] = {
          subCategoryMonthData: {},
          totalAmount: 0,
        };
      }

      if (
        !result[month].monthlyData[categoryName].categoryMonthData[
          subCategoryName
        ].subCategoryMonthData[business_name]
      ) {
        result[month].monthlyData[categoryName].categoryMonthData[
          subCategoryName
        ].subCategoryMonthData[business_name] = {
          business_nameMonthData: [],
          totalAmount: 0,
        };
      }

      result[month].monthlyData[categoryName].categoryMonthData[
        subCategoryName
      ].subCategoryMonthData[business_name].business_nameMonthData.push(
        expense
      );
      result[month].monthlyData[categoryName].categoryMonthData[
        subCategoryName
      ].subCategoryMonthData[business_name].totalAmount += amount;

      result[month].monthlyData[categoryName].categoryMonthData[
        subCategoryName
      ].totalAmount += amount;
      result[month].monthlyData[categoryName].totalAmount += amount;
      result[month].totalAmount += amount;
    });
  });
  return Object.entries(result);
};
