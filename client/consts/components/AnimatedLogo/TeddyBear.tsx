import styled from "styled-components";

import teddy503 from "./teddy503.gif";

import React from "react";

export const StyledBear = styled.div`
  position: relative;
  z-index: 200;
`;
export const TeddyBear = () => (
  <StyledBear>
    <img src={teddy503} width={"100px"} height={"100px"} />
  </StyledBear>
);
