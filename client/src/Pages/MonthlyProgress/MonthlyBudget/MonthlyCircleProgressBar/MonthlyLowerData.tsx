import { FC } from "react";
import styled from "styled-components";
import { toThousandK } from "../../../utils/formatter/thousand";
import CircleComponent from "../../../../../consts/components/Circle";
const StyledWrapper = styled.div`
  width: inherit;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const StyledBalance = styled.div<{ spent?: number }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  line-height: 23.27px;
  width: 83px;
`;

const StyledNumber = styled.div`
  font-weight: 700;
  font-size: 14px;
  line-height: 23.27px;
  color: #242424;
`;
interface Props {
  data: {
    spent: number;
    left: number;
    color: string;
  };
}
export const MonthlyLowerData: FC<Props> = ({ data }: Props) => {
  return (
    <StyledWrapper>
      <StyledBalance>
        <CircleComponent
          raduis={30}
          fillColor={data.color}
          strokeColor={data.color}
        />
        {"Spent"}
        <StyledNumber>{toThousandK(data.spent.toString())}</StyledNumber>
      </StyledBalance>
      <StyledBalance>
        <CircleComponent
          raduis={30}
          fillColor="#e9edf0"
          strokeColor="#e9edf0"
        />

        {"Left"}

        <StyledNumber>{toThousandK(data.left.toString())}</StyledNumber>
      </StyledBalance>
    </StyledWrapper>
  );
};
