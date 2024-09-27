import { FC } from "react";
import { CategoryMonthlyExpenses } from "../../models/expensesCategoryWidget/pieChart";
import { WidgetWrapper, WidgetGrid } from "./StyledComponent";
import { RenderPieChart } from "./PieCharts/RenderPieChart";
import { RenderTable } from "./BreakDownTable/RenderTable";
import MyContextProvider from "./expensesCategoryContext";
import { DropDownStateController } from "./DropDownController";

interface Props {
  data: CategoryMonthlyExpenses;
}

const ExpensesByCategory: FC<Props> = ({ data }: Props) => {
  return (
    <MyContextProvider>
      <WidgetGrid className="widgetGrid">
        <WidgetWrapper className="Widget-PieChart">
          <DropDownStateController data={data} />
          <RenderPieChart data={data} />
        </WidgetWrapper>
        <WidgetWrapper className="Widget-tableBreakDown">
        <RenderTable data={data} />
        </WidgetWrapper>
      </WidgetGrid>
    </MyContextProvider>
  );
};
export default ExpensesByCategory;
