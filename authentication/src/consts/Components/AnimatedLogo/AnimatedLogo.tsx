import styled from "styled-components";
import { TeddyBear } from "./TeddyBear";
import { StyledCircle } from "./StyledCircle";

const LogoWrapper = styled.div`
  display: flex;
  width: 200px;
  height: 200px;
  background: #ffdbca;
  border-radius: 145px;
`;
export const AnimatedLogo = () => {
  return (
    <LogoWrapper id="LogoWrapper">
      <TeddyBear />
      <StyledCircle />
    </LogoWrapper>
  );
};
