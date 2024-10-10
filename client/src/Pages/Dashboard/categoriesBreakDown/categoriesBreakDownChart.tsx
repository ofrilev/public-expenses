import { FC } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  ChartOptions,
} from "chart.js";
import { color } from "../../../../consts/colors";
import { StyledDoughnut } from "../StyledComponents";
import { MonthDataBreakDown } from "../Dashboard";

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

  const data = {
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
        offset: (context: any) => {
          return context.dataIndex === chosenCategory ? 10 : 0;
        },
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
      //   shadowPlugin: {},
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
        backgroundColor: (context: any) => {
          // return `${colors[context.tooltipItems[0]?.dataIndex]}`;
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
    onClick(event, elements, chart) {
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
  const shadowPlugin = {
    id: "shadowPlugin",
    afterDraw: (chart: {
      ctx: any;
      data: { datasets: any[] };
      getDatasetMeta: (arg0: any) => any;
    }) => {
      const ctx = chart.ctx;
      chart.data.datasets.forEach((dataset, i) => {
        if (i == chosenCategory) {
          const meta = chart.getDatasetMeta(i);
          meta.data.forEach(
            (
              element: {
                x: any;
                y: any;
                outerRadius: any;
                startAngle: any;
                endAngle: any;
                innerRadius: any;
              },
              index: string | number
            ) => {
              ctx.save();
              ctx.shadowColor = "rgba(0, 0, 0, 0.5)"; // Set shadow color
              ctx.shadowBlur = 10; // Set shadow blur
              ctx.shadowOffsetX = 5; // Horizontal shadow offset
              ctx.shadowOffsetY = 5; // Vertical shadow offset

              // Draw the slice with shadow
              ctx.beginPath();
              ctx.arc(
                element.x,
                element.y,
                element.outerRadius,
                element.startAngle,
                element.endAngle
              );
              ctx.arc(
                element.x,
                element.y,
                element.innerRadius,
                element.endAngle,
                element.startAngle,
                true
              );
              ctx.closePath();
              ctx.fillStyle = dataset.backgroundColor[index];
              ctx.fill();

              ctx.restore();
            }
          );
        }
      });
    },
  };

  // Register the plugin with Chart.js
  //   ChartJS.register(shadowPlugin);

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
            <LegendColorBox color={data.datasets[0].backgroundColor[index]} />
            {label}
          </LegendItem>
        ))}
      </LegendContainer>
      <DoughnutContainer>
        <Doughnut data={data} options={options} />
      </DoughnutContainer>
    </ChartContainer>
  );
};
