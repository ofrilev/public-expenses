import { format as formatDate, addMonths } from "date-fns";

export const getTodayDate = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
};
export const todayMonth = (format: string): string => {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  return formatDate(month, format);
};
export const todayYear = (format: string): string => {
  const today = new Date();
  const year = today.getFullYear();
  return formatDate(year, format);
};

/**
 *@description
    Returns a number of an array of strings of months from today
 * @param monthNum - the number of mount to be added
 * @param form - the format "MMMM" || MM/YYYY"
 * @example 
 * //"MMMM" : "January" or "MM/YYYY": "02/2024"
 */
export const getMonthsList = (numMonths: number, format: string): string[] => {
  const monthsList = [];
  const currentDate = new Date();

  for (let i = 0; i < numMonths; i++) {
    const nextMonth = addMonths(currentDate, -i);
    const formattedMonth = formatDate(nextMonth, format);
    monthsList.push(formattedMonth);
  }
  return monthsList;
};
