import styled from "styled-components";
import { Expense } from "../../../models/fetch/expense";
import { color } from "../../../../consts/colors";
import { useEdit } from "./useEdit";

const ItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Item = styled.div<{ index: number }>`
  height: 44px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background: ${(props) => props.index % 2 == 1 && color.carbon["25"]};
  border-bottom: 1px solid ${color.carbon["700"]};
  width: 100%;
  color: ${color.carbon["400"]};
  & > div {
    display: flex;
    width: 150px;
    margin-left: 30px;
  }
  .date {
    margin-left: unset;
    color: ${color.carbon["500"]};
    font-weight: 800;
    font-size: medium;
  }
`;
export const Items = (props: { expenses: Expense[] }) => {
  return (
    <ItemsWrapper>
      {props.expenses.map((e, index) => {
        const { EditIcon } = useEdit();
        return (
          <Item key={e.id} index={index}>
            <div className="date">{e.date}</div>
            <div>{e.card_number}</div>
            <div>{e.business_name}</div>
            <div>{e.amount}</div>
            <div>{e.category}</div>
            {EditIcon()}
          </Item>
        );
      })}
    </ItemsWrapper>
  );
};
