import styled from "styled-components";

export const ProgressUpperSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
export const CategoryTitle = styled.div`
  position: relative;
  left: 9px;
  width: 70px;
  line-height: 33.24px;
  font-weight: 700;
  font-size: 25px;
  align-items: center;
`;
export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
`;
export const StyledEditButton = styled.div<{ isHovered: boolean }>`
  width: 100px;
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 33.24px;
  font-weight: 700;
  font-size: 15px;
  background-color: ${({ isHovered }) =>
    isHovered ? "#e0e0e0" : "transparent"};
  /* border: ${({ isHovered }) =>
    isHovered ? "1px solid #e0e0e0" : "transparent"}; */
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  cursor: pointer;
`;
export const ToggleBarWrapper = styled.div<{ isToggled: boolean }>`
  width: 50px;
  height: 24px;
  background-color: ${(props) => (props.isToggled ? "#594caf" : "#ccc")};
  border-radius: 12px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;
export const StyledChangeButton = styled.button<{
  isChanged: boolean;
  isHovered: boolean;
}>`
  pointer-events: ${({ isChanged }) => (isChanged ? "" : "none")};
  cursor: ${({ isChanged }) => (isChanged ? "pointer" : "default")};
  width: 115px;
  height: 60px;
  padding: 7px;
  line-height: 20.24px;
  font-weight: 600;
  font-size: 12px;
  color: ${({ isChanged }) => (isChanged ? "#000" : "#e0e0e0")};
  background-color: ${({ isHovered, isChanged }) =>
    isHovered && isChanged ? "#e0e0e0" : "transparent"};
  border: ${({ isChanged }) =>
    isChanged ? "1px solid #F48080" : "1px solid #e0e0e0"};
  transition: border 0.3s ease;
  transition: color 0.3s ease;
  border-radius: 10px;
`;
export const ToggleCircle = styled.div<{ isToggled: boolean }>`
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: ${(props) => (props.isToggled ? "26px" : "2px")};
  transition: left 0.3s ease;
`;
