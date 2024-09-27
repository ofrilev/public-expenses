import styled from "styled-components";
import { keyframes } from "styled-components";
import circle from "./circ2.gif";
import React from "react";
const rotate = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const StyledSpin = styled.div`
  height: 73px;
  width: fit-content;
  /* position: absolute; */
  position: relative;
  top: 8px;
  right: 85px;
  animation: ${rotate} 30s linear infinite;
`;
const SpinningCircle = () => <img src={circle} width="73px" height="73px" />;
export const StyledCircle = () => (
  <StyledSpin>
    <SpinningCircle />
  </StyledSpin>
);