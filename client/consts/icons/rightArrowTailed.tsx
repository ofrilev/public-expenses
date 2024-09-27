
import styled from "styled-components";

interface RightArrowTailedProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
  width?: string;
  height?: string;
}

const StyledSVG = styled.svg<RightArrowTailedProps>`
  width: ${({ width }) => width || "25px"};
  height: ${({ height }) => height || "30px"};

  path {
    fill: ${({ color }) => color || "#B0BAC8"};
  }
`;

const RightArrowTailedIcon: React.FC<RightArrowTailedProps> = (props) => {
  return (
    //@ts-ignore
    <StyledSVG
      width="24"
      height="24"
      xmlns="http://www.w3.org/2000/svg"
      fill-rule="evenodd"
      clip-rule="evenodd"
      {...props}
    >
      <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" />
    </StyledSVG>
  );
};

export default RightArrowTailedIcon;
