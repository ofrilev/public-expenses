import styled from "styled-components";

export const MainWrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  background: linear-gradient(#fadccd, #f4a57d);
  display: flex;
`;
export const Image = styled.img`
  z-index: 1;
  opacity: 6%;
  position: absolute;
  width: 50%;
  height: 100%;
`;
export const LeftSide = styled.div`
  z-index: 2;
  width: 40%;
  display: flex;
  flex-direction: column;
  gap: 130px;
`;
export const NavButtonsWrapper = styled.div`
  margin-top: 50px;
  justify-self: center;
  display: flex;
  flex-direction: column;
  align-items: end;

  /* height: 100px; */
`;
export const NavBarButton = styled.button<{ selected: boolean }>`
  font-size: 24px;
  font-weight: 700;
  line-height: 39.89px;
  background-color: ${(props) => (props.selected ? "white" : "transparent")};
  color: ${(props) => (props.selected ? "#f4a57d" : "#FFFF")};
  border-radius: 125px 0 0 125px;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
  margin-right: -20px;
  &:hover {
    color: rgba(244, 165, 125, 0.5);
  }

`;

export const MainTextFrame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
export const MainTitle = styled.div`
  white-space: nowrap;
  font-size: 72px;
  font-weight: 500;
  line-height: 65px;
  text-align: center;
`;
export const StyledWord = styled.span`
  display: flex;
  justify-content: center;
  font-size: 72px;
  font-weight: 700;
`;
