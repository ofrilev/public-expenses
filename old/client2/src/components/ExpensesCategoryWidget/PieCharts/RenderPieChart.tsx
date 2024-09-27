import { FC, useEffect, useState } from "react";
import { IUsePieChartsProps, UsePieCharts } from "./usePieCharts";
import { ResponsiveContainer } from "recharts";
import { useBreakDownDataContext } from "../expensesCategoryContext";
import { getPieChartState } from "./utils";
import { CategoryMonthlyExpenses } from "../../../models/expensesCategoryWidget/pieChart";

interface Props {
  data: CategoryMonthlyExpenses;
}

export const RenderPieChart: FC<Props> = ({ data }: Props) => {
  const { contextState } = useBreakDownDataContext();
  const [pieChartData, setPieChartData] = useState<IUsePieChartsProps>();

  useEffect(() => {
    const s = getPieChartState(data, "month");
    setPieChartData(s);
  }, []);
  const handleContextChange = () => {
    if (contextState.category) {
      setPieChartData(
        getPieChartState(
          //@ts-ignore
          data[contextState.month].monthlyData[contextState.category][
            "categoryMonthData"
          ],
          "subCategory"
        )
      );
      return;
    }
    if (contextState.month) {
      setPieChartData(
        //@ts-ignore
        getPieChartState(data[contextState.month]["monthlyData"], "category")
      );
      return;
    }
  };

  useEffect(() => {
    handleContextChange();
  }, [contextState]);

  const pieChartFilteredData = pieChartData?.data.filter((item: any) => {
    return item?.totalAmount !== 0 && item?.category !== "totalAmount";
  });
  return (
    pieChartData && (
      <ResponsiveContainer className="grid-item" minHeight={250} minWidth={500}>
        <UsePieCharts
          data={pieChartFilteredData}
          dataKey={pieChartData.dataKey}
          nameKey={pieChartData.nameKey}
        />
      </ResponsiveContainer>
    )
  );
};
