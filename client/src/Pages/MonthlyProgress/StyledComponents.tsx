import { styled } from "styled-components";

export const PageWrapper = styled.div`
  width: 985px;
  display: flex;
  flex-direction: column;
`;
export const UpperSection = styled.div`
  display: flex;
  width: inherit;
  flex-direction: row;
  justify-content: space-between;
  align-items: end;
  font-size: 30px;
  font-weight: 700;
  text-align: center;
`;

export const MonthCategoriesSection = styled.div`
  display: flex;
  width: inherit;
  flex-direction: row;
  justify-content: center;
  gap: 40px;
`;
export const ProgressSection = styled.div`
  display: flex;
  gap: 15px;
  width: 947px;
  flex-direction: column;
  justify-content: center;
  border: solid 1px #e7e7e7;
  border-radius: 20px;
  padding: 25px 30px 0;
`;
