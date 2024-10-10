import styled from "styled-components";
import { LogosInterface } from "./logosInterface";

const StyledSVG = styled.svg<LogosInterface>`
  width: ${({ width }) => width || "24px"};
  height: ${({ height }) => height || "24px"};
  path {
    stroke: ${({ color }) => color || "#b0c8b7"};
  }
  cursor: pointer;
`;

export const CancelIcon: React.FC<LogosInterface> = (props) => {
  const { viewBox = "0 0 24 24", ...rest } = props;
  return (
    <StyledSVG viewBox={viewBox} xmlns="http://www.w3.org/2000/svg" {...rest}>
      <path
        d="M13 13L8 8M8 8L3 3M8 8L13 3M8 8L3 13"
        stroke="#434343"
        stroke-width="2"
        stroke-linecap="round"
      />
    </StyledSVG>
  );
};
