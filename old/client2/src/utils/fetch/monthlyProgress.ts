import { getTodayDate } from "../../consts/common/dateToday";
import { fetchData } from "../useFetch";
import {
  MonthlyProgresess,
  MonthlyProgress,
} from "../../models/fetch/monthlyProgress";

export const GetMonthlyProgress = async (): Promise<MonthlyProgress[]> => {
  const td = getTodayDate().split("/");
  const MandY = td[0] + "/" + td[1] + "/" + "01";
  let mp: MonthlyProgress[] = [];
  const res = await fetchData<MonthlyProgresess>(
    `/monthly-progress?date=${MandY}&limit=100`
  );
  if (res.monthlyProgresess && res.monthlyProgresess.length > 0) {
    mp = res.monthlyProgresess;
  }
  return mp;
};
