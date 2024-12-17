import styled from "styled-components";
import { keyframes } from "styled-components";
import circle from "../../images/circ2.gif";
const rotate = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const StyledSpin = styled.div`
  height: fit-content;
  width: fit-content;
  position: absolute;
  position: relative;
  top: 12px;
  right: 174px;
  animation: ${rotate} 30s linear infinite;
`;
const SpinningCircle = () => <img src={circle} width="150px" height="150px" />;
export const StyledCircle = () => (
  <StyledSpin>
    <SpinningCircle />
  </StyledSpin>
);
