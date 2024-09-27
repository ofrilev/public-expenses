import { MonthlyProgress } from "../../models/fetch/monthlyProgress";
import { CategoriesObjArr } from "../../models/models";
import { fetchData } from "../../utils/useFetch";
export type BreakDownByCategory = {
  category: string;
  breakDown: {
    business_name: string;
    amount: number;
    date: string;
  }[];
}[];
export const getProgressBreakDownByCategory = async (
  monthlyProgressData: MonthlyProgress[]
): Promise<BreakDownByCategory> => {
  const promises = monthlyProgressData.map(async (item) => {
    const breakDown = await fetchData<
      {
        business_name: string;
        amount: number;
        date: string;
      }[]
    >(
      `/monthly/category/progress/breakdown?date=${item.date}&category=${item.category}`
    );
    return {
      category: item.category,
      breakDown: breakDown,
    };
  });
  return await Promise.all(promises);
};
export const getCategoriesObjArr = async () => {
  return await fetchData<CategoriesObjArr>("/categories");
};
