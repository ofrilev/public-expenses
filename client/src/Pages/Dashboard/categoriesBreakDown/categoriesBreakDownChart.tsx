import { FC } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  ChartOptions,
  ChartData,
} from "chart.js";
import { color } from "../../../../consts/colors";
import { MonthDataBreakDown } from "../Dashboard";
import { StyledDoughnut } from "../StyledComponents";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, Title);
interface Props {
  monthlyExpenses: MonthDataBreakDown;
  changeCategory: (category: number) => void;
  chosenMonth: number;
  chosenCategory: number;
}
const colors = color.PieChartColors_1;
export const CategoriesBreakDown: FC<Props> = ({
  changeCategory,
  chosenMonth,
  chosenCategory,
  monthlyExpenses,
}: Props) => {
  const labels: string[] = [];
  const dataSet: number[] = [];

  Object.entries(monthlyExpenses[chosenMonth][1].monthlyData).map(
    ([category, breakDown]) => {
      labels.push(category);
      dataSet.push(breakDown.totalAmount);
    }
  );
  const chartData: ChartData<"doughnut"> = {
    labels: labels,
    datasets: [
      {
        data: dataSet,
        backgroundColor: colors,
        borderColor: (context: any) => {
          return context.dataIndex == chosenCategory
            ? "rgba(0, 0, 0, 0.35)"
            : "";
        },
        borderWidth: (context: any) => {
          return context.dataIndex === chosenCategory ? 4 : 0;
        },
        offset: ((context: any) => {
          return context.dataIndex === chosenCategory ? 10 : 0;
        }) as unknown as number,

        hoverOffset: 30,
      },
    ],
  };
  // Optional: Customize the chart options
  const options: ChartOptions<"doughnut"> = {
    radius: 85,
    responsive: true,
    animation: {
      animateRotate: false,
      animateScale: false,
    },
    plugins: {
      legend: {
        display: false,
        position: "bottom",
        align: "start",
        maxWidth: 80,
        maxHeight: 300,
        fullSize: true,
        labels: {
          usePointStyle: true,
          pointStyleWidth: 16,
          pointStyle: "circle",
        },
      },
      tooltip: {
        position: "average",
        backgroundColor: (_context: any) => {
          return "rgba(0, 0, 0, 0.8)";
        },
        yAlign: "bottom",
        titleColor: () => "#FFFFFF",
        titleFont: () => ({ size: 13, weight: 400 }),
        callbacks: {
          title: (tooltipItem: any) => {
            return tooltipItem[0]?.formattedValue;
          },
          label: () => "",
        },
      },
    },
    onClick(_event, elements, _chart) {
      if (elements.length > 0) {
        changeCategory(elements[0]?.index);
      }
    },
    onHover: (event: any, elements: any) => {
      if (elements.length > 0) {
        event.native.target.style.cursor = "pointer";
      } else {
        event.native.target.style.cursor = "default";
      }
    },
    cutout: "55%",
  };
  const {
    ChartContainer,
    LegendContainer,
    LegendItem,
    LegendColorBox,
    DoughnutContainer,
  } = new StyledDoughnut();

  return (
    <ChartContainer>
      <LegendContainer id="LegendContainer">
        {labels.map((label, index) => (
          <LegendItem key={index} isSelected={index == chosenCategory}>
            {Array.isArray(chartData.datasets[0].backgroundColor) && (
              <LegendColorBox
                color={chartData.datasets[0].backgroundColor[index]}
              />
            )}
            {label}
          </LegendItem>
        ))}
      </LegendContainer>
      <DoughnutContainer>
        <Doughnut data={chartData} options={options} />
      </DoughnutContainer>
    </ChartContainer>
  );
};
