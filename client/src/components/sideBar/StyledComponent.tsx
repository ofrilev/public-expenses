import styled from "styled-components";
import { color } from "../../../consts/colors";

export const SideBarWrapper = styled.div`
  height: 1024px;
  top: 3386px;
  gap: 44px;
  min-width: 344px;
  width: 23%;
  border-radius: 0px 25px 25px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
`;
export const ItemsWrapper = styled.div`
  flex-direction: column;
  justify-items: center;
  height: 259px;
  top: 217px;
  left: 61px;
  gap: 50px;
  opacity: 0px;
  display: flex;
`;
export const StyledLogoWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
export const StyledModalButton = styled.div`
  display: flex;
  align-items: end;
  width: 70px;
`;
export const CircleWithText = styled.div`
  cursor: pointer;
  position: relative;
  align-self: end;
  display: inline-block;
  font-size: 16px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  width: 25px;
  background-color: ${color.red["300"]};
  border: 1px solid ${color.red["300"]};
  border-radius: 20px;

  /* Hover effect */
  &:hover {
    background-color: ${color.red["300"]};
    opacity: 0.63;
    transition-delay: 100ms;
    &::after {
      content: "set unkown expenses";
      position: absolute;
      top: -30px;
      left: 35px;
      background-color: ${color.red["500"]};
      color: white;
      padding: 5px 10px;
      border-radius: 4px;
      font-size: 12px;
    }
  }
`;
