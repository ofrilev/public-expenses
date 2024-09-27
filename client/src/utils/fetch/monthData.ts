import { getMonthsList, getTodayDate } from "../../global/date/dateToday";
import { fetchData } from "../useFetch";
import { Expenses, Expense } from "../../models/fetch/expense";
export interface MonthData {
  month: string;
  amount: number;
}

export const GetMonthData = async (): Promise<MonthData[]> => {
  const monthsName = getMonthsList(6, "MMMM").reverse();
  const monthsDate = getMonthsList(6, "yyyy/MM/01").reverse();
  let monthData: MonthData[] = [];

  for (let i = 0; i < monthsName.length - 1; i++) {
    const ms = await getMonthSum(monthsDate[i]);
    monthData[i] = { amount: ms ? ms : 0, month: monthsName[i] };
  }
  return monthData;
};
const getMonthSum = async (md: string): Promise<number> => {
  const res = await fetchData<Expenses>(`expenses?date[gte]=${md}`);
  let sum = 0;
  if (res.expenses && res.expenses.length > 0) {
    sum = res.expenses.reduce((acc, item) => acc + (item.amount || 0), 0);
  }

  return sum;
};
