import { FC, useEffect, useState } from "react";
import {
  getFirstState,
  getStringFromDate,
  getTotalSum,
} from "./ChangeMonthlyProgress/utils";
import { ChangeMonthlyProgressModal } from "./ChangeMonthlyProgress/ChangeMonthlyProgressModal";
import { MonthlyProgress } from "../../models/models";
import { ModalSummary } from "./ModalSummary";
import { deleteReq, fetchData, postReq, putReq } from "../../utils/useFetch";
import { AvgRatioMonthData } from "./ChangeMonthlyProgress/FilterDateAvgComponents/fetchAvgMonthData";
import { CategoriesObjArr } from "../../models/models";
import { useLoading } from "../loadingContext/LoadingContext";

enum ModalStep {
  MonthlyProgress = 0,
  Summary = 1,
}

interface IModalStepControlller {
  monthlyProgress: MonthlyProgress[];
  categoriesObjArr: CategoriesObjArr;
  handleClose: () => void;
  AvgRatioMonthData: AvgRatioMonthData[];
}

export type ModalMonthlyProgress = MonthlyProgress & {
  parentId?: number | null;
  id?: number;
};
export const ModalStepControlller: FC<IModalStepControlller> = ({
  monthlyProgress,
  categoriesObjArr,
  handleClose,
  AvgRatioMonthData,
}) => {
  const [mmp, setmmp] = useState<ModalMonthlyProgress[]>(monthlyProgress);
  const [stepNumber, setStepNumber] = useState(ModalStep.MonthlyProgress);
  const [chosenDate, setChosenDate] = useState<string>(
    getStringFromDate(new Date())
  );
  const [monthlyProgressFirstState, setMonthlyProgressFirstState] = useState<
    ModalMonthlyProgress[]
  >(getFirstState(mmp, categoriesObjArr));

  const [totalSum, setTotalSum] = useState<number>(
    getTotalSum(monthlyProgressFirstState)
  );

  const [monthlycategoriesProgressArr, setMonthlycategoriesProgressArr] =
    useState<ModalMonthlyProgress[]>(monthlyProgressFirstState);

  const { setLoading } = useLoading();

  useEffect(() => {
    setTotalSum(getTotalSum(monthlyProgressFirstState));
    setMonthlycategoriesProgressArr(monthlyProgressFirstState);
    setLoading(false);
  }, [monthlyProgressFirstState]);

  const nextClickHandle = () => {
    setStepNumber(ModalStep.Summary);
  };
  const backClickHandle = () => {
    setStepNumber(ModalStep.MonthlyProgress);
  };

  const handleDateChange = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    let modDate = year + "-" + month;
    if (chosenDate != modDate) {
      setLoading(true);
      const fetchNewMmp = async (): Promise<ModalMonthlyProgress[]> =>
        await fetchData<ModalMonthlyProgress[]>(
          `/monthly/category/progress?date=${modDate}`
        );
      const data = fetchNewMmp();
      data.then((d) => {
        setChosenDate(modDate);
        setmmp(d);
        setMonthlyProgressFirstState(getFirstState(d, categoriesObjArr));
      });
    }
  };

  const handleMonthlyCategoryChange = (newState: ModalMonthlyProgress[]) => {
    setMonthlycategoriesProgressArr(newState);
    setTotalSum(getTotalSum(newState));
  };

  const [changedProgressIndxArr, setChangedProgressIndxArr] = useState<
    number[]
  >([]);

  const onSubmiitClick = () => {
    const getOption = (
      modStateProgress: {
        goal_amount: number;
        category: string;
      },
      fstStateProgress: {
        goal_amount: number;
        category: string;
      }
    ) => {
      if (modStateProgress.goal_amount === 0) {
        let progressId = getProgressId(fstStateProgress.category, chosenDate);
        return deleteReq(`/option/category/progress/${progressId}`);
      } else if (fstStateProgress.goal_amount === 0) {
        return postReq(`/option/category/progress`, {
          date: chosenDate,
          goal_amount: modStateProgress.goal_amount,
          category: modStateProgress.category,
        });
      } else {
        let progressId = getProgressId(fstStateProgress.category, chosenDate);
        return putReq(`/option/category/progress/${progressId}`, {
          goal_amount: modStateProgress.goal_amount,
        });
      }
    };
    const getProgressId = (category: string, date: string) => {
      const item = mmp.find(
        (progrees) => progrees.category == category && progrees.date == date
      );
      return item?.id;
    };
    for (let i of changedProgressIndxArr) {
      let { goal_amount, category } = monthlyProgressFirstState[i];
      const fstStateProgress = { goal_amount, category };
      let { goal_amount: g, category: c } = monthlycategoriesProgressArr[i];
      const modStateProgress = { goal_amount: g, category: c };

      getOption(modStateProgress, fstStateProgress);
    }
    handleClose();
  };

  useEffect(() => {
    const tempIndexArr: number[] = [];
    monthlycategoriesProgressArr.map((subCategory, index) => {
      if (
        subCategory.parentId !== null &&
        subCategory.goal_amount !== monthlyProgressFirstState[index].goal_amount
      ) {
        tempIndexArr.push(index);
      }
    });
    if (tempIndexArr !== changedProgressIndxArr) {
      setChangedProgressIndxArr(tempIndexArr);
    }
  }, [monthlycategoriesProgressArr]);

  return (
    <>
      {stepNumber === ModalStep.MonthlyProgress && (
        <ChangeMonthlyProgressModal
          chosenDate={chosenDate}
          totalSum={totalSum}
          handleDateChange={handleDateChange}
          firstState={monthlyProgressFirstState}
          monthlyProgress={monthlycategoriesProgressArr}
          handleMonthlyCategoryChange={handleMonthlyCategoryChange}
          onNextClick={nextClickHandle}
          isNextVisible={changedProgressIndxArr.length >= 1}
          avgRatioMonthData={AvgRatioMonthData}
        />
      )}
      {stepNumber === ModalStep.Summary && (
        <ModalSummary
          monthlyProgressFirstState={monthlyProgressFirstState}
          monthlycategoriesProgressArr={monthlycategoriesProgressArr}
          changedProgressIndxArr={changedProgressIndxArr}
          onBackClick={backClickHandle}
          onSubmitClick={onSubmiitClick}
        />
      )}
    </>
  );
};
