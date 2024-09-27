import { FC } from "react";
import styled from "styled-components";
import { toThousandK } from "../../../utils/formatter/thousand";
import CircleComponent from "../../../../../consts/components/Circle";

const StyledWrapper = styled.div`
  width: inherit;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 3px;
`;
const StyledBalance = styled.div<{ spent?: number }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #767676;
  font-size: 10px;
  line-height: 16.62px;
  gap: 2px;
`;

const StyledNumber = styled.div`
  font-weight: 700;
  font-size: 10px;
  line-height: 16.62px;
  color: #242424;
`;
interface Props {
  data: {
    spent: number;
    left: number;
    color: string;
  };
}
export const CategoriesLowerData: FC<Props> = ({ data }: Props) => {
  return (
    <StyledWrapper>
      <StyledBalance>
        <CircleComponent
          raduis={20}
          fillColor={data.color}
          strokeColor={data.color}
        />
        {"Spent"}
        <StyledNumber>{toThousandK(data.spent.toString())}</StyledNumber>
      </StyledBalance>
      <StyledBalance>
        <CircleComponent
          raduis={20}
          fillColor="#e9edf0"
          strokeColor="#e9edf0"
        />
        {"Left"}
        <StyledNumber>{toThousandK(data.left.toString())}</StyledNumber>
      </StyledBalance>
    </StyledWrapper>
  );
};
