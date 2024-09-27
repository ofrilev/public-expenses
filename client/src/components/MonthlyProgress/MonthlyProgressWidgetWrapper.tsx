import { FC, useEffect, useState } from "react";
import { CategoriesObjArr } from "../../models/models";
import { MonthlyProgressWidget } from "./MonthlyProgressWidget";
import { getCategoriesObjArr } from "./utils";
import LoaderGif from "../../consts/components/LoaderGif";
import { useProgressBreakDownByCategory } from "./useProgressBreakDownByCategory";
import { useAvgRatioMonthData } from "./useAvgMonthData";
import { MonthlyProgress } from "../../models/fetch/monthlyProgress";
import { useCategoriesContext } from "../categoriesContext/CategoriesContext";

export interface IMonthlyProgressWidgetWrapper {
  monthlyProgressData: MonthlyProgress[];
}

export const MonthlyProgressWidgetWrapper: FC<
  IMonthlyProgressWidgetWrapper
> = ({ monthlyProgressData }) => {
  const { progressBreakDown } =
    useProgressBreakDownByCategory(monthlyProgressData);
  const { avgRatioMonthCategoryData } = useAvgRatioMonthData();
  // const [categoriesObjArr, setCategoriesObjArr] = useState<CategoriesObjArr>();
  const { categoriesContext } = useCategoriesContext();
  // useEffect(() => {
  //   const fetchCategoriesObjArr = async () => {
  //     const res = await getCategoriesObjArr();
  //     if (res.Categories[0]) {
  //       debugger;
  //       setCategoriesObjArr(res);
  //     }
  //   };
  //   fetchCategoriesObjArr();
  // }, []);
  const shouldLoadBreakDown = monthlyProgressData ? progressBreakDown : true;
  return (
    <div className={"bar-chart grid-item big-size"}>
      {shouldLoadBreakDown &&
      avgRatioMonthCategoryData.length > 0 &&
      categoriesContext ? (
        <MonthlyProgressWidget
          categoriesObjArr={categoriesContext}
          monthlyProgressData={monthlyProgressData}
          progressBreakDown={progressBreakDown}
          AvgRatioMonthData={avgRatioMonthCategoryData}
        />
      ) : (
        <div>
          <LoaderGif />
        </div>
      )}
    </div>
  );
};
