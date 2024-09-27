import styled from "styled-components";
import ThreeDotsIcon from "../../../consts/icons/threeDots";

export const StyledTableITemWrapper = styled.div`
  padding: 4px;
  display: flex;
  flex-direction: row;
  gap: 8px;
`
export const ExpenseBreakDown = styled.div`
  display: none;
  position: absolute;
  border: 3px;
  width: 300px;

`
export const ToolTipWrapper = styled.div`
  height: 30px;
  width: 30px;
  cursor: pointer;
  :hover + ${ExpenseBreakDown}{
    display: block;
    transition: transform 2s ease 3s ;
    transform: translateY(20%);
  }
`


export const StyledThreeDots = styled(ThreeDotsIcon)`
  :hover{
    border: dashed 1px;
    border-radius: 20px;
    //background-color: #3E74FE ;
    //opacity: 0.133;
  }
`


export const BreakDownContainer = styled.div`
  padding: 10px;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  background-color: #E6E9EC;
  border-radius: 10px;
  
`
export const BreakDownColumn = styled.div `
  display: flex;
  gap: 7px;
  flex-direction: column;
  justify-content: space-between;
`
export const BreakDownTitle = styled.div`
  align-self: center;
  font-size: 16px;
`
export const  StyledItem = styled.div`
    display: flex;
  flex-direction: row;
  align-items: center;
  gap: 3px;
  
`
