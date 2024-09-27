import { useLoading } from "../../components/loadingContext/LoadingContext";
import LoaderGif from "../../../consts/components/LoaderGif";
import { Widget } from "../../components/widget/Widget";
import { CategoriesBreakDown } from "./categoriesBreakDown/categoriesBreakDownChart";
import { BarChart } from "./monthlyChart/monthlyChart";
import { MonthlyComparisonBarChart } from "./monthlyComparisonInsights/monthlyComparisonChart";
import {
  FirstGridItem,
  ForthGridItem,
  GridWrapper,
  SecondGridItem,
  StyledGrid,
  ThirdGridItem,
} from "./StyledComponents";
import { SubCategoriesBreakDown } from "./subCategoriesBreakDown/subCategoriesBreakDownChart";
import { FC, useEffect, useState } from "react";
import { MonthlyData } from "../../models/expensesCategoryWidget/pieChart";
import { useMonthExpensesContext } from "../../global/globalStates/MonthExpensesContext";
import { useLoader } from "../utils/loading/useLoader";

export type MonthDataBreakDown = [
  string,
  {
    monthlyData: MonthlyData;
    totalAmount: number;
  }
][];
interface Props {
  monthlyExpenses: MonthDataBreakDown;
}
export const Dashboard: FC<Props> = ({ monthlyExpenses }: Props) => {
  const [chosenMonth, setChosenMonth] = useState(
    monthlyExpenses ? monthlyExpenses.length - 1 : 0
  );
  const [chosenCategory, setChosenCategory] = useState(0);

  const changeMonth = (month: number) => {
    setChosenMonth(month);
  };

  const changeCategory = (category: number) => {
    setChosenCategory(category);
  };

  return (
    <GridWrapper>
      <StyledGrid>
        <FirstGridItem>
          <Widget title="Monthly Expense Summary">
            <div
              style={{
                height: "190px",
                position: "relative",
                top: "59px",
                paddingLeft: "40px",
                paddingBottom: "17.84px",
              }}
            >
              <BarChart
                chosenMonth={chosenMonth}
                changeMonth={changeMonth}
                changeCategory={changeCategory}
              />
            </div>
          </Widget>
        </FirstGridItem>
        <SecondGridItem>
          <Widget title="Categories Breakdown" height={314} width={401}>
            <CategoriesBreakDown
              chosenMonth={chosenMonth}
              chosenCategory={chosenCategory}
              changeCategory={changeCategory}
            />
          </Widget>
        </SecondGridItem>
        <ThirdGridItem>
          <Widget title="Sub-Categories Breakdown" height={314} width={401}>
            <SubCategoriesBreakDown
              chosenCategory={chosenCategory}
              chosenMonth={chosenMonth}
            />
          </Widget>
        </ThirdGridItem>
        <ForthGridItem>
          <Widget title="Monthly Comparison insight" height={314} width={559}>
            <div
              style={{
                height: "239px",
                position: "relative",
                top: "18px",
                paddingLeft: "40px",
                paddingBottom: "17.84px",
              }}
            >
              <MonthlyComparisonBarChart />
            </div>
          </Widget>
        </ForthGridItem>
      </StyledGrid>
    </GridWrapper>
  );
};
