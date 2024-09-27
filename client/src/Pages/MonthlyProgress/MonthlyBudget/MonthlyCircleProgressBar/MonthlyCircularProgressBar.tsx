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
  fontSize = 18,
  color = "#4c6ef5",
}: Props) => {
  const percentage = data.spent == 0 ? 0 : (data.spent / data.budget) * 100;
  const strokeWidth = 10; // Stroke width of the progress bar
  const radius = 50 - strokeWidth / 2; // Radius of the circular path
  const circleRatio = 0.75; // Three-quarters of a circle
  const circumference = 2 * Math.PI * radius * circleRatio; // Circumference of the partial circle
  const offset = circumference * (1 - percentage / 100); // Calculate the stroke offset

  // Calculate the rotation angle based on the percentage and circleRatio
  const rotationAngle = 360 * circleRatio * (percentage / 100);

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

const Circle = (percentage: number, fontSize: number, strokeWidth: number) => {
  return (
    <div>
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          overflow: "visible", // Ensure the circle end is not clipped
        }}
        viewBox="0 0 100 100"
      >
        <circle
          cx="50%"
          cy="50%"
          r={5} // Radius of the end circle, adjust this to make the end circle larger or smaller
          fill="#a34cf5"
          style={{
            transformOrigin: "50% 50%",
            transform: `rotate(${percentage}deg) translate(0, -${
              50 - strokeWidth / 2
            }px)`,
          }}
        />
      </svg>
      <div
        style={{
          textAlign: "center",
          marginTop: "10px",
          fontSize: `${fontSize}px`,
        }}
      ></div>
    </div>
  );
};
