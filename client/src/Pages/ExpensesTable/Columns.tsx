import styled from "styled-components";
import { color } from "../../../consts/colors";
import { Expense } from "../../models/fetch/expense";
import { useState } from "react";
import ArrowIcon from "../../../consts/icons/Arrow";
const ColumnsWrapper = styled.div`
  height: 44px;
  border-top: 1px solid ${color.carbon["700"]};
  border-bottom: 1px solid ${color.carbon["700"]};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 31px;
  background: ${color.carbon["15"]};
`;
const ColumnItem = styled.div<{ clickable: boolean }>`
  display: flex;
  cursor: ${(props) => (props.clickable ? "pointer" : "auto")};
  flex-direction: row;
  margin-left: ${(props) => props.key == 0 && "10px"};
  width: 150px;
  font-size: large;
  font-weight: 700;
  text-align: left;
  color: ${color.carbon[100]};
  .sort-icon {
    margin: 6px 0 0 8px;
  }
`;

export const Columns = (props: {
  changeExpenses: (expenses: Expense[]) => void;
  expenses: Expense[];
}) => {
  enum SortOption {
    UNDEFIND = "undefind",
    UP = "up",
    DOWN = "down",
  }
  const columnsNames = [
    "Date",
    "Card number",
    "Business name",
    "Amount",
    "Category",
  ];
  const [sortBy, setSortBy] = useState<SortOption[]>(
    new Array(columnsNames.length - 1).fill(SortOption.UNDEFIND)
  );
  const shouldBeDisabled = (index: number) =>
    sortBy[index] == SortOption.UNDEFIND || index == 2 || index == 4;

  const sortByField = (sortByIndex: number) => {
    const sortedExpenses = [...props.expenses];
    switch (sortByIndex) {
      //date
      case 0:
        if (sortBy[sortByIndex] == SortOption.UP) {
          sortedExpenses.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
          });
        } else {
          sortedExpenses.sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          });
        }
        break;
      //card_number;
      case 1:
        if (sortBy[sortByIndex] == SortOption.UP) {
          sortedExpenses.sort((a, b) => a.card_number - b.card_number);
        } else {
          sortedExpenses.sort((a, b) => b.card_number - a.card_number);
        }
        break;
      //amount
      case 3:
        if (sortBy[sortByIndex] == SortOption.UP) {
          sortedExpenses.sort((a, b) => a.amount - b.amount);
        } else {
          sortedExpenses.sort((a, b) => b.amount - a.amount);
        }
        break;
    }
    props.changeExpenses(sortedExpenses);
    const temp = [...sortBy].map((s, index) => {
      if (index == sortByIndex) {
        return s == SortOption.UP ? SortOption.DOWN : SortOption.UP;
      } else {
        return SortOption.UNDEFIND;
      }
    });
    setSortBy(temp);
  };

  return (
    <ColumnsWrapper>
      {columnsNames.map((c, index) => (
        <ColumnItem
          key={index}
          onClick={() => sortByField(index)}
          clickable={!shouldBeDisabled(index)}
        >
          {c}

          <ArrowIcon
            className="sort-icon"
            direction={sortBy[index] as any}
            disabled={shouldBeDisabled(index)}
          />
        </ColumnItem>
      ))}
    </ColumnsWrapper>
  );
};
