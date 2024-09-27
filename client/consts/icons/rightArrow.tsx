import React from "react";
import styled from "styled-components";

interface RightArrowProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
  width?: string;
  height?: string;
  hoverColor?: string;
  disabled?: boolean;
}

const StyledSVG = styled.svg<RightArrowProps>`
  cursor: pointer;
  width: ${({ width }) => width || "25px"};
  height: ${({ height }) => height || "30px"};
  display: ${({ disabled }) => (disabled ? "none" : "block")};
  path {
    fill: ${({ color }) => color || "#B0BAC8"};
  }
  &:hover path {
    fill: ${({ hoverColor }) =>
      hoverColor || "#4A90E2"}; // Change fill color on hover
  }
`;

const RightArrowIcon: React.FC<RightArrowProps> = (props) => {
  return (
    //@ts-ignore
    <StyledSVG
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6-1.41-1.41z"
        fillRule="evenodd"
      />
    </StyledSVG>
  );
};

export default RightArrowIcon;
