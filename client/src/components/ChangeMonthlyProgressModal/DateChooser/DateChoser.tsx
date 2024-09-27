import { useEffect } from "react";
import { useDateChooser } from "./useDateChooser";
import styled from "styled-components";
import RightArrowIcon from "../../../consts/icons/rightArrow";
import LeftArrowIcon from "../../../consts/icons/leftArrow";
import { color } from "../../../consts/colors";
import { getDateFromString } from "../ChangeMonthlyProgress/utils";

type DateChooserComponentProps = {
  chosenDate: string;
  onDateChange: (date: Date) => void;
};
const Styledbutton = styled.div`
  visibility: hidden;
  margin: 0 5px 0 5px;
`;
const DateContainer = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: center;
  &:hover ${Styledbutton} {
    cursor: pointer;
    opacity: 1; // Make it visible
    visibility: visible;
    transition-delay: 0.5s ease-in-out;
  }
`;

export const DateChooserComponent: React.FC<DateChooserComponentProps> = ({
  chosenDate,
  onDateChange,
}) => {
  const { date, incrementMonth, decrementMonth, formatDate } = useDateChooser(
    getDateFromString(chosenDate)
  );
  const currentDate = new Date();
  const startOfCurrentMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  useEffect(() => {
    if (onDateChange) {
      onDateChange(date);
    }
  }, [date]);
  return (
    <DateContainer id="DateContainer">
      {date.getMonth() > startOfCurrentMonth.getMonth() && (
        <Styledbutton onClick={decrementMonth}>
          <LeftArrowIcon color={color.carbon[200]} />
        </Styledbutton>
      )}
      {formatDate()}
      {
        <Styledbutton onClick={incrementMonth}>
          <RightArrowIcon color={color.carbon[200]} />
        </Styledbutton>
      }
    </DateContainer>
  );
};
