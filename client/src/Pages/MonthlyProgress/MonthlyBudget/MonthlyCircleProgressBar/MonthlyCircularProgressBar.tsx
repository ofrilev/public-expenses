import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styled from "styled-components";
import { MonthlyLowerData } from "./MonthlyLowerData";

const Wrapper = styled.div<{ width: number; height: number }>`
  display: flex;
  flex-direction: column;
  gap: 33px;
  position: relative;
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
`;

interface Props {
  data: {
    spent: number;
    budget: number;
  };
  width?: number;
  height?: number;
  fontSize?: number;
  color?: string;
}
export const MonthlyCircularProgress = ({
  data,
  width = 200,
  height = 200,
  color = "#4c6ef5",
}: Props) => {
  const percentage = data.spent == 0 ? 0 : (data.spent / data.budget) * 100;
  const strokeWidth = 10; // Stroke width of the progress bar
  const circleRatio = 0.75; // Three-quarters of a circle
  return (
    <Wrapper width={width} height={height} className="wrapperProgress">
      <CircularProgressbar
        value={percentage}
        strokeWidth={strokeWidth}
        circleRatio={circleRatio}
        styles={buildStyles({
          rotation: 0.625,
          pathColor: color,
          trailColor: "#e9ecef",
          strokeLinecap: "round",
        })}
      />
      <MonthlyLowerData
        data={{
          spent: data.spent,
          left: data.budget - data.spent,
          color: color,
        }}
      />
    </Wrapper>
  );
};

