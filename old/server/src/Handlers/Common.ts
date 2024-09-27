import moment from "moment";

export enum Response {
  FAILED = "failed",
  SUCCESS = "success",
}

const currentDate = moment();
export const currentYear = currentDate.year();
export const currentMonth = currentDate.month();
export const monthDateObj = (year: number, month: number) =>
  moment([year, month]);
export const getDateOfRecentMonths = (numberOfMonth: number): string[] => {
  let recentMonthDates = [];
  let date = new Date();
  for (let i = 0; i <= numberOfMonth; i++) {
    date.setMonth(currentMonth - i);
    recentMonthDates.push(
      monthDateObj(date.getFullYear(), date.getMonth()).format("MM/YYYY")
    );
  }
  return recentMonthDates;
};
export const changeToYearMonth = (monthYear: string) => {
  const month = monthYear.split("-")[0];
  const year = monthYear.split("-")[1];
  return `${year}-${month}`;
};

export const changeToMonthYear = (yearMonth: string) => {
  const year = yearMonth.split("-")[0];
  const month = year.split("-")[1];
  return `${month}-${year}`;
};
