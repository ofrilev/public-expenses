import { useEffect, useState } from "react";
import {
  AvgRatioMonthData,
  fetchAvgRatioMonthData,
} from "../ChangeMonthlyProgressModal/ChangeMonthlyProgress/FilterDateAvgComponents/fetchAvgMonthData";
import { getCategoriesObjArr } from "./utils";

export const useAvgRatioMonthData = () => {
  const [avgRatioMonthCategoryData, setAvgRatioMonthCategoryData] = useState<
    AvgRatioMonthData[]
  >([]);
  useEffect(() => {
    const fetchAndSetAvgRatioMonthData = async () => {
      const categoriesObjArr = await getCategoriesObjArr();
      const data = await fetchAvgRatioMonthData(categoriesObjArr);
      if (data[0]) {
        setAvgRatioMonthCategoryData(data);
      }
    };
    fetchAndSetAvgRatioMonthData();
  }, []);
  return { avgRatioMonthCategoryData };
};
