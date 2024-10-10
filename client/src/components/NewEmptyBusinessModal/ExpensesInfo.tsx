import styled from "styled-components";

const StyledWrapper = styled.div<{ shouldShow?: boolean }>`
  background-color: #e0e0e0;
  display: block;
  position: absolute;
  top: 15%;
  right: 35%;
  transform: translateY(23%);
  display: flex;
  flex-direction: column;
  width: 240px;
  box-shadow: 0px 4px 12px 0px #0000002e;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  white-space: nowrap;
`;
const StyledColumns = styled.div`
  gap: 2px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const StyledColumn = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledLowerSection = styled.div<{ left: boolean }>`
  width: 100%;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: ${({ left }) => (left ? "20px 0 0 20px" : "0 20px 20px 0")};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  & div {
    align-items: center;
    padding: 5px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    display: flex;
  }
`;
interface Props {
  data: [{ date: string; amount: number }];
}
export const ExpensesInfo = ({ data }: Props) => (
  <StyledWrapper className="expensesInfo">
    <StyledColumns>
      <StyledColumn>
        <div> Amount</div>
        <StyledLowerSection left={true}>
          {data.map((item: any) => (
            <div>
              <div>{item.amount}</div>
            </div>
          ))}
        </StyledLowerSection>
      </StyledColumn>
      <StyledColumn>
        <div> Date </div>
        <StyledLowerSection left={false}>
          {data.map((item: any) => (
            <div>
              <div>{item.date}</div>
            </div>
          ))}
        </StyledLowerSection>
      </StyledColumn>
    </StyledColumns>
  </StyledWrapper>
);
