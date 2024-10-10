import styled from "styled-components";
import { LogosInterface } from "./logosInterface";

const StyledSVG = styled.svg<LogosInterface>`
  cursor: pointer;
  width: ${({ width }) => width || "24px"};
  height: ${({ height }) => height || "24px"};
  &:hover path {
    fill: ${({ color }) => color || "#B0BAC8"};
  }
  display: ${({ disabled }) => (disabled ? "none" : "block")};
`;

export const InfoLogo: React.FC<LogosInterface> = (props) => {
  return (
    <StyledSVG xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M22 12C22 17.523 17.523 22 12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12ZM13 8C13 8.26522 12.8946 8.51957 12.7071 8.70711C12.5196 8.89464 12.2652 9 12 9C11.7348 9 11.4804 8.89464 11.2929 8.70711C11.1054 8.51957 11 8.26522 11 8C11 7.73478 11.1054 7.48043 11.2929 7.29289C11.4804 7.10536 11.7348 7 12 7C12.2652 7 12.5196 7.10536 12.7071 7.29289C12.8946 7.48043 13 7.73478 13 8ZM12 10C11.7348 10 11.4804 10.1054 11.2929 10.2929C11.1054 10.4804 11 10.7348 11 11V16C11 16.2652 11.1054 16.5196 11.2929 16.7071C11.4804 16.8946 11.7348 17 12 17C12.2652 17 12.5196 16.8946 12.7071 16.7071C12.8946 16.5196 13 16.2652 13 16V11C13 10.7348 12.8946 10.4804 12.7071 10.2929C12.5196 10.1054 12.2652 10 12 10Z"
        fill="#242424"
      />
    </StyledSVG>
  );
};
