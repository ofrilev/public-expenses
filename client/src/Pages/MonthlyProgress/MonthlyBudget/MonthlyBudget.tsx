import { FC } from "react";
import { WidgetFrame, WidgetWrapper, Title } from "./StyledComponent";
import { MonthlyCircularProgress } from "./MonthlyCircleProgressBar/MonthlyCircularProgressBar";

interface Props {
  data: {
    spent: number;
    budget: number;
  };
}
export const MonthlyBudget: FC<Props> = ({ data }: Props) => {
  const { spent, budget } = data;

  return (
    <WidgetFrame>
      <WidgetWrapper>
        <>
          <Title>Monthly Budget {budget}</Title>
          {MonthlyCircularProgress({
            width: 222,
            height: 222,
            data: {
              spent,
              budget,
            },
          })}
        </>
      </WidgetWrapper>
    </WidgetFrame>
  );
};
