import styled from "styled-components";

export const ButtonsWrapper = styled.button<{selected: boolean}>`
  color: ${props => props.selected ? `hsl(0, 0%, 90%)`  : "inherit"};
`;