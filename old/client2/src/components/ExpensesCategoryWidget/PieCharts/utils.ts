import {
  CategoryMonthData,
  CategoryMonthlyExpenses,
  MonthlyData,
} from "../../../models/expensesCategoryWidget/pieChart";

export const getPieChartState = (
  data: CategoryMonthlyExpenses | MonthlyData[] | CategoryMonthData[],
  breakDown: string
) => {
  const breakDownTitle = breakDown;
  const newData = Object.entries(data)
    .filter(
      ([breakDown, breakDownData]) =>
        breakDown !== "totalAmount" || breakDownData.totalAmount !== 0
    )
    .map(([breakDown, breakDownData]) => {
      return {
        [breakDownTitle]: breakDown,
        totalAmount: breakDownData.totalAmount,
      };
    });
  return { data: newData, nameKey: breakDownTitle, dataKey: "totalAmount" };
};
