import styled from "styled-components";
import { LogosInterface } from "./logosInterface";


const StyledSVG = styled.svg<LogosInterface>`
  height: ${({ height }) => height || "24px"};

  path {
    fill: ${({ color }) => color || "#B0BAC8"};
  }
`;

const CalendarIcon: React.FC<LogosInterface> = (props) => {
  return (
    <StyledSVG
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M19 4H17V2H15V4H9V2H7V4H5C3.897 4 3 4.897 3 6V20C3 21.103 3.897 22 5 22H19C20.103 22 21 21.103 21 20V6C21 4.897 20.103 4 19 4ZM18 19H12V13H18V19ZM19 9H5V7H19V9Z"
      />
    </StyledSVG>
  );
};

export default CalendarIcon;
