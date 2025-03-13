import React from "react";
import styled from "styled-components";

interface ChangeIconProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
  width?: string;
  height?: string;
  hoverColor?: string;
  disabled?: boolean;
}

const StyledSVG = styled.svg<ChangeIconProps>`
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

const ChangeIcon: React.FC<ChangeIconProps> = (props) => {
  return (
    <StyledSVG
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.1663 10.4835V12.7585C12.1663 14.6585 11.408 15.4168 9.50801 15.4168H7.24134C5.34967 15.4168 4.58301 14.6585 4.58301 12.7585V10.4835C4.58301 8.59183 5.34134 7.8335 7.24134 7.8335H9.51634C11.408 7.8335 12.1663 8.59183 12.1663 10.4835Z"
        stroke="black"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15.4163 7.2335V9.5085C15.4163 11.4085 14.658 12.1668 12.758 12.1668H12.1663V10.4835C12.1663 8.59183 11.408 7.8335 9.50801 7.8335H7.83301V7.2335C7.83301 5.3335 8.59134 4.5835 10.4913 4.5835H12.7663C14.658 4.5835 15.4163 5.34183 15.4163 7.2335Z"
        stroke="#344054"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M18.3333 12.5C18.3333 15.725 15.725 18.3333 12.5 18.3333L13.375 16.875"
        stroke="#344054"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M1.6665 7.50008C1.6665 4.27508 4.27484 1.66675 7.49984 1.66675L6.62484 3.12508"
        stroke="#344054"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </StyledSVG>
  );
};

export default ChangeIcon;
