import React from "react";
import styled from "styled-components";

interface LeftArrowProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
  width?: string;
  height?: string;
  hoverColor?: string;
  disabled?: boolean;
}

const StyledSVG = styled.svg<LeftArrowProps>`
  width: ${({ width }) => width || "25px"};
  height: ${({ height }) => height || "30px"};
  display: ${({ disabled }) => (disabled ? "none" : "block")};
  pointer-events: none;
  path {
    pointer-events: all;
    fill: ${({ color }) => color || "#B0BAC8"};
    &:hover {
      cursor: pointer;
      fill: ${({ hoverColor }) =>
        hoverColor || "#4A90E2"}; // Change fill color on hover
    }
  }
`;

const LeftArrowIcon: React.FC<LeftArrowProps> = (props) => {
  return (
    <StyledSVG
      viewBox="0 0 24 24" // Updated viewBox
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15.41 7.66l-4.58 4.59 4.58 4.59L14 18.25l-6-6 6-6 1.41 1.41z" // Updated path for left arrow
        fillRule="evenodd"
      />
    </StyledSVG>
  );
};

export default LeftArrowIcon;
