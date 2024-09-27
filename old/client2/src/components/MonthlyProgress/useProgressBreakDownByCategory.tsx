import { useEffect, useState } from "react";
import { BreakDownByCategory, getProgressBreakDownByCategory } from "./utils";
import { MonthlyProgress } from "../../models/fetch/monthlyProgress";

export const useProgressBreakDownByCategory = (
  monthlyProgressData: MonthlyProgress[]
) => {
  const [progressBreakDown, setProgressBreakDown] =
    useState<BreakDownByCategory>([]);
  useEffect(() => {
    const fetchProgressBreakDown = async () => {
      if (monthlyProgressData) {
        const data = await getProgressBreakDownByCategory(monthlyProgressData);
        if (data[0]?.["category"]) {
          setProgressBreakDown(data);
        }
      }
    };
    fetchProgressBreakDown();
  }, [monthlyProgressData]);
  return { progressBreakDown };
};
