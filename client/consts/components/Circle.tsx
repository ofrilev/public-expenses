import styled from "styled-components";

// Styled component for the SVG wrapper
const StyledSVG = styled.svg`
  width: 13px;
  height: 13px;
`;

// Styled component for the circle element
const StyledCircle = styled.circle<{
  fillColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
}>`
  fill: ${(props) => props.fillColor || "blue"};
  stroke: ${(props) => props.strokeColor || "black"};
  stroke-width: ${(props) => props.strokeWidth || 2};
`;

interface Props {
  raduis?: number;
  fillColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
}
const CircleComponent = ({
  raduis = 40,
  fillColor = "lightblue",
  strokeColor = "darkblue",
  strokeWidth = 4,
}: Props) => {
  return (
    <StyledSVG viewBox="0 0 100 100">
      <StyledCircle
        cx="50"
        cy="50"
        r={raduis}
        fillColor={fillColor}
        strokeColor={strokeColor}
        strokeWidth={strokeWidth}
      />
    </StyledSVG>
  );
};

export default CircleComponent;
