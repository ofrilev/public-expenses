import styled from "styled-components";


import React from "react";
import { TeddyBear } from "./TeddyBear";
import { StyledCircle } from "./StyledCricle";

const LogoWrapper = styled.div`
  display: flex;
  width: 96px;
  height: 96px;
  background: #ffdbca;
  border-radius: 145px;
`;
export const AnimatedLogo = () => {
  return (
    <LogoWrapper>
      <TeddyBear />
      <StyledCircle />
    </LogoWrapper>
  );
};