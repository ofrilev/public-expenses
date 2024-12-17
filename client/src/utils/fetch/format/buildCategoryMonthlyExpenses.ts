import { MonthDataBreakDown, CategoryMonthlyExpenses } from "../../../models/expensesCategoryWidget/pieChart";
import { Expense } from "../../../models/fetch/expense";
import { CategoriesObj } from "../../../models/models";

export interface MonthExpenses {
    month: string;
    expenses: Expense[];
  }
  

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
  export const buildCategoryMonthlyExpenses = (
    data: MonthExpenses[],
    categories: CategoriesObj[]
  ): MonthDataBreakDown[] => {
    const categoryMap = createCategoryMap(categories);
    const result: CategoryMonthlyExpenses = {};
  
    data.forEach((monthlyData) => {
      const { month, expenses } = monthlyData;
      expenses.forEach((expense: Expense ) => {
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
  