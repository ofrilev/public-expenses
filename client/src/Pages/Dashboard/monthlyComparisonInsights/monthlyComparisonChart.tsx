import { FC, useState, useRef } from "react";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { toThousandComma, toThousandK } from "../../utils/formatter/thousand";
import { MonthDataBreakDown } from "../Dashboard";
import { color } from "../../../../consts/colors";
import { useMonthExpensesContext } from "../../../global/globalStates/MonthExpensesContext";
import { getComparison, getLabelsAndDataSets } from "./monthComparisonUtils";

// Register the components needed for the bar chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export type monthsComparison = {
  monthName: string;
  data: { [category: string]: number };
};

export const MonthlyComparisonBarChart: FC = () => {
  const { monthlyExpensesContext: monthlyExpenses } = useMonthExpensesContext();
  const chartRef = useRef<any>(null);
  const colors = color.PieChartColors_1.reverse();
  const [monthsComparison, setMonthsComparison] = useState<monthsComparison[]>(
    getComparison(monthlyExpenses, 2)
  );
  const { labels, dataSets } = getLabelsAndDataSets(monthsComparison);
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const data = {
    labels: labels,
    datasets: dataSets.map((data, index) => {
      return {
        label: monthsComparison[index].monthName,
        borderSkipped: false,
        hoverBackgroundColor: `${colors[index]}0.95`,
        data: data,
        backgroundColor: () => colors[index],
        borderWidth: 1,
        borderRadius: Number.MAX_VALUE,
        barThickness: 10,
      };
    }),
  };

  const options = {
    animation: {
      delay: (context: any) => {
        let delay = 0;
        if (context.type === "data" && context.mode === "default") {
          delay = context.dataIndex * 300 + context.datasetIndex * 100;
        }
        return delay;
      },
    },
    scales: {
      x: {
        ticks: {
          padding: 17.7,

          color: "#767676",
          font: (context: any) => {
            return {
              size: 10,
              weight: context.index == activeIndex ? 700 : 400,
            };
          },
        },
        border: { display: false },
        grid: { display: false },
      },
      y: {
        ticks: {
          stepSize: 1000,
          max: Math.max(...data.datasets[0].data),
          color: "#767676",
          font: { size: 10, weight: 600 },
          callback: (value: string, index: number) => {
            return index % 2 !== 0 ? toThousandK(value) : "";
          },
        },
        border: { display: false },
        grid: {
          display: (context: any) => context.dataIndex % 2 !== 0,
        },
      },
    },
    plugins: {
      legend: {
        align: "end",
        labels: {
          boxHeight: 10,
          boxWidth: 10,
          font: { size: 10 },
          usePointStyle: true,
          pointStyleWidth: 16,
          pointStyle: "circle",
        },
        display: true,
      },
      tooltip: {
        display: true,
        backgroundColor: "#FFF0E6",
        yAlign: "bottom",
        titleColor: () => "black",
        titleFont: () => ({ size: 10, weight: 400 }),
        caretSize: 0,
        callbacks: {
          title: (tooltipItem: any) => {
            return toThousandComma(tooltipItem[0]?.formattedValue);
          },
          label: () => "",
        },
      },
    },
    onHover: (event: any, elements: any) => {
      setActiveIndex(elements[0]?.index);
    },
    responsive: true,
  };

  // @ts-ignore
  return <Bar ref={chartRef} data={data} options={options} />;
};
