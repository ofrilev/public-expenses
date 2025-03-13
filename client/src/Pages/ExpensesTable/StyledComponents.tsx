import styled from "styled-components";
import { color } from "../../../consts/colors";

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export const TableWrapper = styled.div`
  width: 948px;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  border: 1px solid ${color.carbon["700"]};
  align-items: center;
`;
export const UpperSection = styled.div`
  display: flex;
  height: 79px;
  width: 90%;
  flex-direction: row;
  padding: 10px;
  align-items: center;
  justify-content: space-between;
`;
export const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-around;
`;
