import styled from "styled-components";
import { color } from "../../../../../consts/colors";

export const ModalWrapper = styled.div`
  position: absolute;
  transform: translateX(444px) translateY(230px);
  box-shadow: 0px 4px 12px 0px #0000002e;
  gap: 30px;
  background-color: ${color.carbon["0"]};
  border-radius: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;
export const UpperSectionContent = styled.div`
  display: flex;
  padding: 15px 15px 0 15px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  gap: 20px;
  margin-bottom: 10px;
`;
export const UpperSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
export const FiltersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px 20px 20px;
  gap: 20px;
`;
export const FilterItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
`;
export const IconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  cursor: pointer;
  align-items: center;
  &:hover {
    opacity: 0.4;
  }
`;
export const InputWrapper = styled.div<{ disabled: boolean }>`
  display: flex;
  padding: 10px;
  align-items: center;
  pointer-events: ${(props) => (props.disabled ? "none" : "all")};
  background: ${(props) => props.disabled && color.carbon["100"]};
  flex-direction: row;
  align-items: end;
  gap: 20px;
  & > input {
    border-color: ${(props) => props.disabled && color.carbon["100"]};
    background: ${(props) =>
      props.disabled ? color.carbon["100"] : color.carbon["0"]};
  }
`;
export const DoneButton = styled.div`
  border-radius: 100px;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  width: 42px;
  height: 15px;
  padding: 10px;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background: linear-gradient(#fadccd, #f4a57d);
  &:hover {
    cursor: pointer;
    opacity: 0.55;
    transition: 0.3;
  }
`;
export const LineBreak = styled.div`
  width: 100%;
  height: 2px;
  background: ${color.carbon[100]};
`;
