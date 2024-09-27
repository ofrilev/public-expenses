import styled from "styled-components";

export const CategoryBudgetWidget = styled.div<{ selected: boolean }>`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 155px;
  height: 154px;
  border-radius: 20px;
  ${(props) =>
    props.selected
      ? `
  border: 3px solid #b2ebf2;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  `
      : `
  border: solid 1px #e7e7e7;
  box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.15);
  `}

  &:hover {
    transition: box-shadow 0.2s ease-in-out;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  }
`;
export const BudgetGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 158px);
  grid-template-rows: repeat(2, 158px);
  grid-column-gap: 23px;
  grid-row-gap: 23px;
`;
export const Title = styled.div`
  white-space: nowrap;
  font-size: 12px;
  font-weight: 500;
  line-height: 19.94px;
  text-align: center;
  color: #2e2e30;
`;
