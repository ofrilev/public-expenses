import { getMonthsList} from "../../global/date/dateToday";
import { FetchRequest } from "../useFetch";
import { Expense } from "../../models/fetch/expense";
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
  let fetchedData: Expense[] = [] 
  const request = new FetchRequest<Expense[]>(`expenses?date[gte]=${md}`, fetchedData)
  await request.fetchData()
  let sum = 0;
  if (request.response.status != 1 && request.response.data.length > 0) {
    let data = request.response.data
    sum = data.reduce((acc, item) => acc + (item.amount || 0), 0);
  }
  return sum;
};
