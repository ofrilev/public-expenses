import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import styled from "styled-components";
import { CategoriesLowerData } from "./CategoriesLowerData";

const Wrapper = styled.div<{ width: number; height: number }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
`;

interface Props {
  data: {
    spent: number;
    budget: number;
  };
  width: number;
  height: number;
  fontSize?: number;
  color: string;
}
export const CategoriesCircularProgress = ({
  data,
  width,
  height,
  color,
}: Props) => {
  const percentage = data.spent == 0 ? 0 : (data.spent / data.budget) * 100;
  const percentageToShow = percentage.toFixed(0) + "%";
  return (
    <Wrapper width={width} height={height} className="wrapperProgress">
      <CircularProgressbar
        text={percentageToShow}
        value={percentage}
        styles={buildStyles({
          textSize: "12px",
          textColor: "#2E2E30",
          rotation: 0.5,
          pathColor: color,
          trailColor: "#e9ecef",
          strokeLinecap: "butt",
        })}
      />

      <CategoriesLowerData
        data={{
          spent: data.spent,
          left: data.budget - data.spent,
          color: color,
        }}
      />
    </Wrapper>
  );
};
