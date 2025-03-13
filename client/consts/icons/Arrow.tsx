import React from "react";
import styled from "styled-components";

interface ArrowProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
  width?: string;
  height?: string;
  direction: "right" | "left" | "down" | "up";
  hoverColor?: string;
  disabled?: boolean;
}
const getDirection = (direction: string) => {
  switch (direction) {
    case "left":
      return "rotate(90deg)";
      break;
    case "right":
      return "rotate(-90deg)";
      break;
    case "up":
      return "rotate(180deg)";
      break;
  }
};
const StyledSVG = styled.svg<ArrowProps>`
  cursor: pointer;
  width: ${({ width }) => width || "25px"};
  height: ${({ height }) => height || "30px"};
  display: ${({ disabled }) => (disabled ? "none" : "block")};
  transform: ${(props) => getDirection(props.direction)};
  path {
    fill: ${({ color }) => color || "#B0BAC8"};
  }
  &:hover path {
    fill: ${({ hoverColor }) =>
      hoverColor || "#4A90E2"}; // Change fill color on hover
  }
`;

const ArrowIcon: React.FC<ArrowProps> = (props) => {
  return (
    <StyledSVG
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8.00004 3.33325V12.6666M8.00004 12.6666L12.6667 7.99992M8.00004 12.6666L3.33337 7.99992"
        stroke="#667085"
        stroke-width="1.33333"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </StyledSVG>
  );
};

export default ArrowIcon;
