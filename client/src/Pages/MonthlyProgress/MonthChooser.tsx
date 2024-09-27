import { FC } from "react";
import LeftArrowIcon from "../../../consts/icons/leftArrow";
import RightArrowIcon from "../../../consts/icons/rightArrow";
import styled from "styled-components";

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 68px;
  gap: 6px;
`;
interface Props {
  currentMonth: number;
  changeCurrentMonth: (index: number) => void;
  maxMonth: number;
}
export const MonthChooser: FC<Props> = ({
  changeCurrentMonth,
  currentMonth,
  maxMonth,
}: Props) => {
  const onLeftClick = () => {
    changeCurrentMonth(currentMonth - 1);
  };
  const onRightClick = () => {
    changeCurrentMonth(currentMonth + 1);
  };
  const isLeftDisabled = currentMonth === 0;
  const isRightDisabled = currentMonth + 1 == maxMonth;
  return (
    <ButtonsWrapper>
      <LeftArrowIcon
        max-width="68px"
        max-height="68px"
        hoverColor="#4A90E2"
        disabled={isLeftDisabled}
        onClick={onLeftClick}
      />
      <RightArrowIcon
        max-width="68px"
        max-height="68px"
        hoverColor="#4A90E2"
        disabled={isRightDisabled}
        onClick={onRightClick}
      />
    </ButtonsWrapper>
  );
};
