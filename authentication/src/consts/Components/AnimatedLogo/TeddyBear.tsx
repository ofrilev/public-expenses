import styled from "styled-components";
import teddy503s2 from "./teddy503s2.gif";

export const StyledBear = styled.div`
  position: relative;
  z-index: 200;
`;
export const TeddyBear = () => (
  <StyledBear>
    <img src={teddy503s2} width={"200px"} height={"200px"} />
  </StyledBear>
);
