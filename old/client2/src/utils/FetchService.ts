import { useEffect, useState } from "react";
import { BusinessExpense } from "../models/models";
import { useCategoriesContext } from "../components/categoriesContext/CategoriesContext";
import { fetchData } from "./useFetch";

import moment from "moment";
import { GetMonthData, MonthData } from "./fetch/monthData";
import { GetMonthData as GetCategoryData } from "./fetch/categoryData";
import { CategoryMonthlyExpenses } from "../models/expensesCategoryWidget/pieChart";
import { MonthlyProgress } from "../models/fetch/monthlyProgress";
import { GetMonthlyProgress } from "./fetch/monthlyProgress";
import { GetMonthBreakDown } from "./fetch/getExpensesBreakDown";

const currentDate = moment();
const currentYear = currentDate.year();
const currentMonth = currentDate.format("MM");
type FetchServiceResp = {
  monthData: any;
  monthDataBreakdown: any;
  nullExpensesCategories: BusinessExpense[];
  monthProgressObj: MonthlyProgress[];
  fetchAndSetNullExpensesCategories: (url: string, setState: any) => any;
};

export const FetchService = (): FetchServiceResp => {
  const [monthData, setMonthData] = useState<MonthData[]>();
  const [monthDataBreakdown, setMonthDataBreakdown] = useState<CategoryMonthlyExpenses>();
  const [nullExpensesCategories, setNullExpensesCategories] = useState<
    BusinessExpense[]
  >([]);
  const [monthProgressObj, setMonthProgressObj] = useState<MonthlyProgress[]>(
    []
  );
  const { setCategoriesContext, categoriesContext } = useCategoriesContext();

  const fetchAndSet = (url: string, setState: any) => {
    fetchData(url).then((data) => {
      setState(data);
    });
  };
  useEffect(() => {
    fetchAndSet("categories?page_size=100", setCategoriesContext);    
  },[])
  useEffect(() => {
    
    // fetchAndSet("expenses?category=0&special=0", setNullExpensesCategories);
    if (categoriesContext?.Categories?.length > 0) {
      GetMonthBreakDown(categoriesContext.Categories).then((data) => {setMonthDataBreakdown(data)})  
    }

    // fetchAndSet("/month-data", setMonthData);
    // fetchAndSet("/expenses-list", setExpensesList);
    GetMonthData().then((data) => setMonthData(data));
    GetMonthlyProgress().then((data) => setMonthProgressObj(data));
  },[categoriesContext?.Categories] );
  
// useEffect(() => {
//   if (categoriesContext?.Categories?.length ) {
//   }
// },[categoriesContext.Categories])

  const fetchAndSetNullExpensesCategories = () =>
    fetchAndSet("expenses?category=0&special=0", setNullExpensesCategories);
  return {
    monthDataBreakdown,
    monthData,
    nullExpensesCategories,
    fetchAndSetNullExpensesCategories: fetchAndSetNullExpensesCategories,
    monthProgressObj,
  };
};
