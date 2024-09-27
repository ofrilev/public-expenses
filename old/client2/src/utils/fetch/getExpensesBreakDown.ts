import { CategoryMonthlyExpenses } from "../../models/expensesCategoryWidget/pieChart";
import { CategoriesObj } from "../../models/models";
import { GetMonthData  } from "./categoryData";

export const GetMonthBreakDown = async (categories: CategoriesObj[]): Promise<CategoryMonthlyExpenses> => {
    const res = await GetMonthData(categories)              
    return res
}

