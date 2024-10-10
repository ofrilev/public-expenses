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
import { FC, useState } from "react";
import { MonthlyData } from "../../models/expensesCategoryWidget/pieChart";

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
                monthlyExpenses={monthlyExpenses}
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
              monthlyExpenses={monthlyExpenses}
              chosenMonth={chosenMonth}
              chosenCategory={chosenCategory}
              changeCategory={changeCategory}
            />
          </Widget>
        </SecondGridItem>
        <ThirdGridItem>
          <Widget title="Sub-Categories Breakdown" height={314} width={401}>
            <SubCategoriesBreakDown
              monthlyExpenses={monthlyExpenses}
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
              <MonthlyComparisonBarChart monthlyExpenses={monthlyExpenses} />
            </div>
          </Widget>
        </ForthGridItem>
      </StyledGrid>
    </GridWrapper>
  );
};
