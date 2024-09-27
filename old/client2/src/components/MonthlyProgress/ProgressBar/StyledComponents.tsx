import styled from "styled-components";
import { color } from "../../../consts/colors";

export const ProgressBarWarpper = styled.div`
  display: flex;
  -webkit-box-pack: start;
  flex-direction: column;
  justify-content: center;
  align-items: end;
`;
export const ProgressBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  width: 183px;
`;
export const ProgressBarElement = styled.div`
  border-radius: 14px;
  background-color: #ccc;
  height: 30px;
  width: 80%;
`;

const getProgressColor = (value: number, totalValue: number) => {
  const ratio = value / totalValue;

  if (ratio <= 0.3) {
    return color.green["400"];
  } else if (ratio <= 0.63) {
    return color.yellow["400"];
  } else if (ratio < 1) {
    return color.red["400"];
  } else {
    return color.red["500"];
  }
};

export const ProgressBarFill = styled.div<{
  value: number;
  totalValue: number;
}>`
  height: 30px;
  border-radius: 14px;
  background-color: ${(props) =>
    getProgressColor(props.value, props.totalValue)};
  width: ${(props) => (props.value / props.totalValue) * 100}%;
  max-width: 100%;
  transition: width 0.4s ease;
`;

export const ProgressValue = styled.div`
  height: 30px;
  margin-top: 5px;
  margin-left: 10px;
`;
export const TooltipWrapper = styled.div`
  width: fit-content;
  height: fit-content;
  left: 0;
  right: 0;
  position: absolute;
`;

export const StyledCategoryName = styled.h3`
  display: flex;
  align-items: center;
  /* width: 100%; */
`;

export const BreakDownTableData = styled.div<{ breakDownPosition: boolean }>`
  position: relative;

  /* top: 0px; */
  right: ${(props) => (props.breakDownPosition ? "250px" : "")};
  left: ${(props) => (props.breakDownPosition ? "" : "108px")};
  border-radius: 20px;
  z-index: 1000;
  border: 3px;
  background: rgb(148, 178, 254);
  width: 290px;
  height: fit-content;
  opacity: 0.95;
`;

export const TooltipContent = styled.div<{ x: number; y: number }>`
  /* bottom: 30px; */
  position: relative;
  top: ${(props) => props.y - 170}px;
  left: ${(props) => props.x + 120}px;
  /* top: -86px; */
  /* left: 13px; */
  cursor: pointer;
  align-items: center;
  height: 60px;
  border-radius: 6px;
  text-align: center;
  width: 96px;
  position: absolute;
  z-index: 1000;
  background-color: ${color.midnight["100"]};
  transition: opacity 0.3s ease, visibility 0.1s ease 0.3s; /* Added delay to visibility transition */
  border-color: ${color.midnight["100"]} transparent transparent; // Creates the arrow shape.
  ::after {
    top: 57px;
    left: 30px;
    content: " ";
    position: absolute; // This ensures the arrow appears above the tooltip.
    z-index: 1500;
    //transform: translateX(-50%); // Fine-tunes the centering.
    border-width: 7px; // Adjusted for a smaller arrow.
    border-style: solid;
    border-color: ${color.midnight["100"]} transparent transparent; // Creates the arrow shape.
  }
`;
