import styled from "styled-components";

export const SubacategoriesGrid = styled.div<{
  rows: number;
  isEditMode?: boolean;
}>`
  max-height: 500px;
  display: grid;
  grid-template-columns: repeat(3, 270px);
  grid-template-rows: repeat(7, 124px);
  grid-column-gap: 72px;
  grid-row-gap: ${({ isEditMode }) => (isEditMode ? "24px" : 0)};
`;
export const SubcategoriesFrame = styled.div<{
  isEditMode?: boolean;
  isFocusedIndex: boolean;
}>`
  border: ${({ isFocusedIndex, isEditMode }) =>
    isEditMode && isFocusedIndex
      ? "1px solid #e0e0e0;"
      : "1px solid transperent"};
  cursor: ${({ isEditMode }) => (isEditMode ? "pointer" : "default")};
  /* padding: 20px 10px 5px 10px; */
  border-radius: 20px;
  height: 120px;
  width: 270px;
`;
export const SubcategoriesItemWrapper = styled.div`
  padding: 20px 10px 5px 10px;
  width: 232px;
  height: fit-content;
  /* height: 70px; */
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const SubcategoriesItemUpperSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const StyledSubcategoryTitle = styled.div<{ isEditMode?: boolean }>`
  font-size: ${({ isEditMode }) => (isEditMode ? "14px" : "18px")};
  font-weight: 700;
  max-width: 82px;
  /* white-space: nowrap; */
`;
export const StyledStats = styled.div`
  color: #6f6f6f;
  font-weight: 600;
  font-size: 14px;
  line-height: 16.62px;
`;

export const ProgressBarContainer = styled.div`
  width: 100%;
  background-color: #e0e0e0;
  border-radius: 5px;
  height: 10px;
`;

export const Progress = styled.div<{ value: number; color: string }>`
  width: ${(props) => props.value}%;
  max-width: 100%;
  background-color: ${(props) => props.color};
  height: 100%;
  border-radius: 5px;
`;
export const StyledInput = styled.input<{
  isFocused?: boolean;
  isValueChange: boolean;
}>`
  height: 24px;
  width: 62px;
  border: 1px solid black;
  border-radius: 100px;
  margin-bottom: 10px;
  margin-top: 10px;
  color: ${(props) =>
    props.isValueChange && !props.isFocused ? "red" : "black"};
  & :focus {
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;
