import { getTodayDate } from "../../global/date/dateToday";
import {
  FetchedMonthlyProgress,
  // FetchedMonthlyProgressObject,
  MonthlyProgres,
} from "../../models/fetch/monthlyProgress";
import { CategoriesObj } from "../../models/models";
import { addMonths, format, formatDate } from "date-fns";
import { FetchRequest } from "../useFetch";
import { buildSubcategoriesBreakDown, buildCategoriesBreakDown } from "./format/monthlyprogressUtils";

export const getMonthlyProgress = async (
  categories: CategoriesObj[],
  cache: boolean = false,  
): Promise<MonthlyProgres[]> => {
  let mp: MonthlyProgres[] = [];

  const thisDate = formatDate(getTodayDate(), "yyyy/MM/01");
  let currentMonth = thisDate;
  for (let i = 0; i < 6; i++) {
    mp.push({
      categoryBreakDown: [],
      month: currentMonth,
      goal_amount: 0,
      currentAmount: 0,
    });
    currentMonth = format(addMonths(currentMonth, 1), "yyyy/MM/01");
  }
  const sixMonthsFuture = formatDate(addMonths(thisDate, 6), "yyyy/MM/01");
  let fetchedData: FetchedMonthlyProgress = {} ;
  const request = new FetchRequest(`monthly-progress?date[gte]=${thisDate}&date[lte]=${sixMonthsFuture}&page_size=100`, fetchedData);
  cache ?await request.fetchWithCach(`monthly-progress-${thisDate}`) :
  await request.fetchData()
  if(request.response.status !== 1 && request.response.data){
    fetchedData = request.response.data
  }
  const subcategories = categories.filter((c) => c.parent != null);
  const subcategoriesGlobalMap = new Map(subcategories.map((c) => [c.id, c]));
  
  mp.forEach((p, index) => {
    let reformatedMonth = p.month.replaceAll("/", "-");
    const progress = fetchedData[reformatedMonth] ?? [];
    const subcategoriesBreakDown = buildSubcategoriesBreakDown(progress, subcategoriesGlobalMap);
    const categoriesBreakDown = buildCategoriesBreakDown(subcategoriesBreakDown,categories);
    mp[index] = {
      categoryBreakDown: categoriesBreakDown,
      month: p.month,
      goal_amount: categoriesBreakDown.reduce((a, c) => a + c.goal_amount, 0),
      currentAmount: categoriesBreakDown.reduce(
        (a, c) => a + c.currentAmount,
        0
      ),
    };
  });
  return mp;
};
