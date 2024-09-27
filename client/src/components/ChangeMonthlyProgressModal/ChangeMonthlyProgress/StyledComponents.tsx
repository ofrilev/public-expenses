import styled from "styled-components";
import { color } from "../../../consts/colors";

export const StyledContentWrapper = styled.div`
  height: 543px;
  display: flex;
  flex-direction: column;
  gap: 120px;
  margin: 20px 0 0 10px;
`;

export const StyledTotalAmountWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  gap: 20px;
  margin: 10px 0 0 10px;
`;
export const FilterTotalAmount = styled.div`
  background-color: ${color.red[200]};
  opacity: 0.89;
  border: solid salmon;
  border-width: 2px 2px 2px 1px;
  gap: 4px;
  border-radius: 8px;
`;

export const StyledCategoriesButton = styled.button<{ displayFilter: boolean }>`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 90px;
  padding: 10px 20px;
  border: 1px solid #ccc;
  letter-spacing: 2px;
  align-items: center;
  &:hover {
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    border-radius: 20px;
    background-color: ${color.blue[300]};
  }
`;

export const CategoriesWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: bold;
`;

export const StyledSubCategories = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
  button {
    padding: 10px 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    cursor: pointer;
    background-color: #b8ccfe;
    color: #243c7b;
    &:hover {
      transition: background-color 0.2s ease-in-out;
      background-color: #e3ebff;
    }
  }
`;
export const Input = styled.input``;
