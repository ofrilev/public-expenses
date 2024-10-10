import styled from "styled-components";
import { color } from "../../../consts/colors";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 1, 0.3);
  backdrop-filter: blur(3px);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: #ffff;
  border-radius: 8px;
  padding: 40px;
  max-width: 2875px;
  width: 65%;
  height: 520px;
`;
export const UpperSection = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;
export const StyledTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
`;
export const StyledTitle = styled.div`
  font-size: 24px;
  font-weight: 400;
  line-height: 39.89px;
  color: #242424;
`;
export const InfoButtonWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 25px;
  height: 25px;
`;
export const StyledButton = styled.div<{ shouldShow: boolean }>`
  display: ${(props) => (props.shouldShow ? "flex" : "none")};
  align-items: center;
`;
export const CloseButton = styled.div`
  display: flex;
  align-items: center;
  svg:hover path {
    cursor: pointer;
    stroke: ${color.orange[100]};
  }
`;
export const MiddleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 55px;
  height: 50%;
  width: 100%;
`;
export const CategoriesWrapper = styled.div`
  display: flex;
  flex: 0 1 calc(30% - 15px);
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px 16px;
  max-width: 687px;
  justify-items: center; /* Center grid items horizontally */
`;

export const CategoyItem = styled.button<{ selected: boolean; index?: number }>`
  cursor: pointer;
  width: 159px;
  height: 46px;
  border-radius: 100px;
  border: 1px solid #e1e1e1;
  background-color: ${(props) =>
    props.selected ? color.orange[100] : "#FFFFFF"};
  font-size: 16px;
  font-weight: 400;
  color: ${(props) => (props.selected ? "#eaeaea" : "#a1a1a1")};
  &:hover {
    background-color: ${(props) => !props.selected && "#eaeaea"};
  }
  margin-bottom: 10px;
  margin-left: ${(props) => (props.index && props.index > 3 ? "35px" : "0px")};
`;
export const SubCategoriesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 733px;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 17px;
`;
export const SubcategoryGrid = styled.div<{ itemCount: number }>`
  /* height: ${(props) => (props.itemCount < 4 ? "200px" : "auto")}; */
  display: grid;
  grid-template-columns: ${(props) =>
    props.itemCount < 5 ? `repeat(${props.itemCount}, 1fr)` : `repeat(4, 1fr)`};
  /* grid-template-rows: repeat(2, 27px); */
  row-gap: 15px;
  column-gap: 50px;
`;

export const SubcategoryItem = styled.div<{ selected: boolean }>`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  white-space: nowrap;
  gap: 8px;
  color: ${(props) => (props.selected ? color.orange[100] : "black")};
  height: 27px;
  font-size: 16px;
  font-weight: 400;
  color: ${(props) => (props.selected ? color.orange[100] : "#808080")};
  &:hover {
    opacity: ${(props) => (!props.selected ? 0.4 : 1)};
    transition-delay: 0.3;
  }
`;
export const RadioButton = styled.label<{ selected: boolean }>`
  position: relative;
  display: inline-block;
  width: 24px;
  height: 24px;
  border: 2px solid
    ${(props) => (props.selected ? color.orange[100] : "#808080")}; /* Outer circle color */
  border-radius: 60px;
  cursor: pointer;

  input {
    opacity: 0; /* Hide the default radio input */
    position: absolute;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  /* Inner circle */
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 15px;
    height: 15px;
    background-color: ${(props) =>
      props.selected ? color.orange[100] : "none"}; /* Inner circle color */
    border-radius: 50px;
    transition: background-color 0.3s ease;
  }
`;

export const BottomSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-self: flex-end;
  gap: 20px;
  margin-top: 20px;
`;
interface NavBarProps {
  disabled?: boolean;
}
const NavrBarButton = styled.button<NavBarProps>`
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  width: 122px;
  height: 50px;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
    opacity: 0.55;
    transition-delay: 0.3;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.25;
  }
`;
export const SubmitButton = styled(NavrBarButton)`
  color: white;
  background-color: ${color.orange[100]};
  border: 1px solid ${color.orange[100]};
`;
export const SkipButton = styled(NavrBarButton)`
  color: ${color.orange[100]};
  background-color: white;
  border: 3px solid;
`;
