import { BreakDownTableData } from "./StyledComponents";
import styled from "styled-components";
const StyledTr = styled.tr`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
interface IDataTable {
  data: {
    business_name: string;
    amount: number;
    date: string;
  }[];
  breakDownPosition: boolean;
}
export const DataTable = ({ data, breakDownPosition }: IDataTable) => {
  return (
    <BreakDownTableData
      id="BreakDownTableData"
      breakDownPosition={breakDownPosition}
    >
      <table style={{ width: "90%", marginLeft: "18px" }}>
        <thead>
          <StyledTr>
            <th>Business Name</th>
            <th>Date</th>
            <th>Amount</th>
          </StyledTr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <StyledTr key={index}>
              <td style={{ width: "90px", marginRight: "5px" }}>
                {item.business_name}
              </td>
              <td style={{ padding: "6px", width: "97px" }}>{item.date}</td>
              <td style={{ display: "flex", justifyContent: "space-around" }}>
                {item.amount}
              </td>
            </StyledTr>
          ))}
        </tbody>
      </table>
    </BreakDownTableData>
  );
};
