import styled from "styled-components";

interface LeftArrowProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
  width?: string;
  height?: string;
}

const StyledSVG = styled.svg<LeftArrowProps>`
  width: ${({ width }) => width || "25px"};
  height: ${({ height }) => height || "30px"};

  path {
    fill: ${({ color }) => color || "#B0BAC8"};
  }
`;

const LeftArrowIcon: React.FC<LeftArrowProps> = (props) => {
  return (
    //@ts-ignore
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
