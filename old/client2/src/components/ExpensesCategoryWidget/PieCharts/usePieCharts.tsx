import { FC } from "react";
import { Pie, Legend, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useBreakDownDataContext } from "../expensesCategoryContext";
import { StyledPieChart } from "../StyledComponent";

export interface IUsePieChartsProps {
  data: any;
  nameKey: string;
  dataKey: string;
}

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
// const SUBCOLORS = ['#F08080', '#90EE90', '#FFD700', '#6495ED'];
const COLORS = [
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#e6ba0e",
  "#FF00FF",
  "#FFA510",
];
//@ts-ignore
const SUBCOLORS = [
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#FF00FF",
  "#00FFFF",
  "#FFA500",
  "#800080",
  "#008000",
  "#FFC0CB",
];

export const UsePieCharts: FC<IUsePieChartsProps> = ({
  data,
  nameKey,
  dataKey,
}) => {
  const { updateContextState } = useBreakDownDataContext();
  const updateState = (value: string) => {
    if (nameKey === "month") {
      updateContextState({ month: value });
    } else if (nameKey === "category") {
      updateContextState({ category: value });
    } else if (nameKey === "subCategory") {
      updateContextState({ subCategory: value });
    }
  };
  return (
    <div style={{ width: 660, height: 300 }}>
      <ResponsiveContainer debounce={300} className={"ResponsiveContainer"}>
        <StyledPieChart width={660} height={300}>
          <Pie
            className={"PieChart-Styled"}
            cursor={"pointer"}
            data={data}
            cx="258"
            cy="120"
            nameKey={nameKey}
            label={true}
            labelLine={true}
            outerRadius={70}
            innerRadius={50}
            fill="#8884d8"
            dataKey={dataKey}
            onClick={(e) => {
              console.log(`${e} clicked`);
              updateState(e.name);
            }}
            // activeIndex={this.state.activeIndex}
          >
            {Object.entries(data)?.map(
              (
                //@ts-ignore
                entry: any,
                index: number
              ) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              )
            )}
          </Pie>
          <Tooltip />
          <Legend />
        </StyledPieChart>
      </ResponsiveContainer>
    </div>
  );
};
