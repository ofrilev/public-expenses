import { MonthDataBreakDown } from "../Dashboard";
import { monthsComparison } from "./monthlyComparisonChart";

export const getComparison = (
  monthData: MonthDataBreakDown,
  wantedComparison: number
): monthsComparison[] => {
  const comparisonMonths: monthsComparison[] = new Array(wantedComparison).fill(
    0
  );

  const lastWantedComparisonMonths = Object.values(
    monthData.slice(-wantedComparison)
  );
  lastWantedComparisonMonths.forEach(([monthName, breakDown], index) => {
    comparisonMonths[index] = {
      monthName,
      data: Object.fromEntries(
        Object.entries(breakDown.monthlyData).map(
          ([category, { totalAmount }]) => [category, totalAmount]
        )
      ),
    };
  });
  return comparisonMonths;
};
/**
 * Given an array of monthsComparison, returns the labels and data sets
 * for the chart. The labels are the categories, and the data sets are
 * the amounts for each category in each month.
 * @param {monthsComparison[]} monthsComparison
 * @returns {{labels: string[], dataSets: number[][]}}
 */
export const getLabelsAndDataSets = (monthsComparison: monthsComparison[]) => {
  let labels: string[] = [];
  monthsComparison.map((month) => {
    for (let category in month.data) {
      if (!labels.includes(category)) {
        labels.push(category);
      }
    }
  });
  let dataSets: number[][] = new Array(monthsComparison.length)
    .fill(0)
    .map(() => new Array(labels.length).fill(0));
  for (let i = 0; i < labels.length; i++) {
    let label = labels[i];
    for (let j = 0; j < monthsComparison.length; j++) {
      let month = monthsComparison[j];
      if (month.data[label]) {
        dataSets[j][i] = month.data[label];
      } else {
        dataSets[j][i] = 0;
      }
    }
  }
  return { labels, dataSets };
};
