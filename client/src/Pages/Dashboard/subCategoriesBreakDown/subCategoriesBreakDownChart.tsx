import { FC, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  ChartOptions,
} from "chart.js";
import { StyledDoughnut } from "../StyledComponents";
import { MonthDataBreakDown } from "../Dashboard";
import { color } from "../../../../consts/colors";

interface Props {
  monthlyExpenses: MonthDataBreakDown;
  chosenMonth: number;
  chosenCategory: number;
}
// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const colors = color.PieChartColors_1;
color.shuffleArrayInPlace(colors);

export const SubCategoriesBreakDown: FC<Props> = ({
  monthlyExpenses,
  chosenCategory,
  chosenMonth,
}: Props) => {
  // Define the labels and data for the doughnut chart

  const [activeIndex, setActiveIndex] = useState<number>(0);

  const labels: string[] = [];
  const datasets: number[] = [];
  //@ts-ignore
  const dd = Object.entries(monthlyExpenses[chosenMonth][1].monthlyData)[
    chosenCategory
  ][1].categoryMonthData;

  Object.entries(dd).map(([subCategory, breakDown]) => {
    labels.push(subCategory);
    datasets.push(breakDown.totalAmount);
  });

  const data = {
    labels: labels,
    datasets: [
      {
        data: datasets, // Corresponds to the labels
        backgroundColor: colors,
        borderWidth: 0,
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
          //@ts-ignore
          // return `${colors[context.tooltipItems[0]?.dataIndex]}`;
          return "rgba(0, 0, 0, 0.8)";
        },
        yAlign: "bottom",
        titleColor: () => "#FFFF",
        titleFont: () => ({ size: 13, weight: 400 }),
        callbacks: {
          title: (tooltipItem: any) => {
            return tooltipItem[0]?.formattedValue;
          },
          label: () => "",
        },
      },
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
        if (i == activeIndex) {
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
    <ChartContainer id="hiii">
      <LegendContainer id="LegendContainer">
        {labels.map((label, index) => (
          <LegendItem key={index} isSelected={index == activeIndex}>
            <LegendColorBox
              color={
                // @ts-ignore
                data.datasets[0].backgroundColor[index]
              }
            />
            {label}
          </LegendItem>
        ))}
      </LegendContainer>
      <DoughnutContainer>
        <Doughnut
          // @ts-ignore
          data={data}
          options={options}
        />
      </DoughnutContainer>
    </ChartContainer>
  );
};
