import { useState, useRef, FC, useEffect } from "react";
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
import { StyledTooltip } from "./StyledComponents";
import { toThousandComma, toThousandK } from "../../utils/formatter/thousand";
import { MonthDataBreakDown } from "../../../models/expensesCategoryWidget/pieChart";

// Register the components needed for the bar chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
type tooltipObject = {
  x: number;
  y: number;
  data: string;
  visible: boolean;
};
interface Props {
  monthlyExpenses: MonthDataBreakDown[];
  changeMonth: (month: number) => void;
  changeCategory: (category: number) => void;
  chosenMonth: number;
}
export const BarChart: FC<Props> = ({
  monthlyExpenses,
  changeMonth,
  changeCategory,
  chosenMonth,
}: Props) => {
  const chartRef = useRef<any>(null);
  //change default to the last data number;
  const [tooltipPosition, setTooltipPosition] = useState<tooltipObject>({
    visible: false,
    x: 1,
    y: 1,
    data: "",
  });
  const labels: string[] = [];
  const dataSets: number[] = [];

  monthlyExpenses?.map(([month, breakDown]) => {
    labels.push(month);
    dataSets.push(breakDown.totalAmount);
  });
  const data = {
    labels: labels,
    datasets: [
      {
        display: (context: any) => {
          return context.dataIndex % 2 !== 0;
        },
        borderSkipped: false,
        hoverBackgroundColor: "#F4A79D",
        data: dataSets,
        backgroundColor: (context: any) => {
          return context.dataIndex == chosenMonth ? "#F4A79D" : "#344BFD";
        },

        borderWidth: 1,
        borderRadius: Number.MAX_VALUE,
        barThickness: 16,
      },
    ],
  };
  const options =
    //
    {
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
                weight: context.index == chosenMonth ? 700 : 400,
              };
            },
          },
          border: { display: false },
          grid: { display: false },
        },
        y: {
          ticks: {
            color: "#767676",
            font: { size: 10, weight: 600 },
            callback: (value: string, index: number) => {
              return index % 2 !== 0 ? toThousandK(value) : "";
            },
          },
          border: { display: false },
          grid: { display: false },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
          display: true,
          backgroundColor: "#FFF0E9",
          yAlign: "bottom",
          titleColor: () => "#F07D42",
          titleFont: () => ({ size: 12, weight: 400 }),
          caretSize: 0,
        },
      },
      responsive: true,
      onClick: (e: any) => {
        const chart = chartRef.current;
        const index = e.chart._active[0]?.index;
        if (index != undefined) {
          // Substitute the appropriate scale IDs
          const position = chart.tooltip._active[0].element;
          changeMonth(index);
          changeCategory(0);
          console.log(`onClick position y is ${position.y}`);
          setTooltipPosition({
            x: position.x + 20,
            y: position.y - 30,
            data: toThousandComma(e.chart.data.datasets[0].data[index]),
            visible: true,
          });
        }
      },
      onHover: (event: any, elements: any) => {
        if (elements.length > 0) {
          event.native.target.style.cursor = "pointer";
        } else {
          event.native.target.style.cursor = "default";
        }
      },
    };
  useEffect(() => {
    if (chartRef.current) {
      const timeoutId = setTimeout(() => {
        const barElements = chartRef.current.getDatasetMeta(0).data;
        const chosenElement = barElements[chosenMonth];

        if (chosenElement) {
          const { x, y } = chosenElement.getProps(["x", "y"], true);
          setTooltipPosition({
            visible: true,
            x: x + 22,
            y: y - 40,
            data: toThousandComma(data.datasets[0].data[chosenMonth]),
          });
        }
      }, 800);

      return () => clearTimeout(timeoutId);
    }
  }, []);
  //@ts-ignore
  const bar = <Bar ref={chartRef} data={data} options={options} />;
  return (
    <>
      {bar}
      <StyledTooltip
        visible={tooltipPosition.visible}
        id="StyledTooltip"
        x={tooltipPosition.x}
        y={tooltipPosition.y}
      >
        {tooltipPosition.data}
      </StyledTooltip>
    </>
  );
};
