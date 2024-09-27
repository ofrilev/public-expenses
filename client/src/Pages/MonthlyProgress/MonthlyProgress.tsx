import { FC, useEffect, useState } from "react";
import { PageWrapper } from "../StyledComponents";
import {
  MonthCategoriesSection,
  ProgressSection,
  UpperSection,
} from "./StyledComponents";
import { MonthlyBudget } from "./MonthlyBudget/MonthlyBudget";
import { ProgressBreakDown } from "./ProgressBreakDown/ProgressBreakDown";
import { CategoriesBudget } from "./CategoriesBudget/CategoriesBudget";
import { MonthChooser } from "./MonthChooser";
import { MonthlyProgres } from "../../models/fetch/monthlyProgress";

import {
  CategoriesBreakDown,
  SubcategoriesBreakDown,
} from "../../models/fetch/monthlyProgress";
interface Props {
  monthlyProgress: MonthlyProgres[];
}
export const MonthlyProgress: FC<Props> = ({ monthlyProgress }: Props) => {
  const [currentMonth, setCurrentMonth] = useState<number>(0);
  const [currentCategory, setCurrentCategory] = useState<number>(0);
  const changeCurrentMonth = (index: number) => {
    setCurrentMonth(index);
  };
  const [monthlyBudgetData, setMonthlyBudgetData] = useState<{
    budget: number;
    spent: number;
  }>({
    budget: monthlyProgress[0].goal_amount,
    spent: monthlyProgress[0].currentAmount,
  });
  const [categoriesBreakDown, setCategoriesBreakDown] = useState<
    CategoriesBreakDown[]
  >(monthlyProgress[0].categoryBreakDown);
  const [subCategoriesBreakDown, setSubCategoriesBreakDown] = useState<
    SubcategoriesBreakDown[]
  >(monthlyProgress[0].categoryBreakDown[0].subcategoriesBreakDown);

  const handleCategoryChange = (index: number) => {
    setSubCategoriesBreakDown(
      categoriesBreakDown?.[index]?.subcategoriesBreakDown
    );
    setCurrentCategory(index);
  };

  //on every month change
  useEffect(() => {
    setMonthlyBudgetData({
      spent: monthlyProgress?.[currentMonth]?.currentAmount,
      budget: monthlyProgress?.[currentMonth]?.goal_amount,
    });
    setCategoriesBreakDown(monthlyProgress?.[currentMonth]?.categoryBreakDown);
    setSubCategoriesBreakDown(
      monthlyProgress?.[currentMonth]?.categoryBreakDown[currentCategory]
        .subcategoriesBreakDown
    );
  }, [currentMonth]);

  return (
    <PageWrapper>
      <UpperSection>
        <div>{monthlyProgress?.[currentMonth]?.month}</div>
        <MonthChooser
          changeCurrentMonth={changeCurrentMonth}
          currentMonth={currentMonth}
          maxMonth={monthlyProgress?.length - 1}
        />
      </UpperSection>
      <MonthCategoriesSection className="Monthsection">
        <MonthlyBudget data={monthlyBudgetData} />
        <CategoriesBudget
          categoriesBreakDown={categoriesBreakDown}
          onCategoryChange={handleCategoryChange}
          currentCategory={currentCategory}
        />
      </MonthCategoriesSection>
      <ProgressSection>
        <ProgressBreakDown
          subCategoriesBreakDown={subCategoriesBreakDown}
          currentMonth={monthlyProgress?.[currentMonth]?.month}
        />
      </ProgressSection>
    </PageWrapper>
  );
};
