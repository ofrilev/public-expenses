import { FC } from "react";
import { useBreakDownDataContext } from "../expensesCategoryContext";
import { Table } from "./BreakDownTable";
import { ResponsiveContainer } from "recharts";
import { CategoryMonthlyExpenses } from "../../../models/expensesCategoryWidget/pieChart";

interface Props {
  data: CategoryMonthlyExpenses;
}
export const RenderTable: FC<Props> = ({ data }: Props) => {
  const { contextState } = useBreakDownDataContext();

  return (
    <>
      {contextState?.month && (
        <ResponsiveContainer
          className="grid-item"
          minHeight={250}
          minWidth={500}
        >
          <Table data={data} />
        </ResponsiveContainer>
      )}
    </>
  );
};
