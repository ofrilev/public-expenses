import  { FC} from "react";
import { ModalMonthlyProgress } from "./ModalStepController";
import styled from "styled-components";
import { StyledCategoriesButton } from "./ChangeMonthlyProgress/StyledComponents";
import {
  ButtonWrapper,
  NavigationButtonsWrapper,
  SubmitButtonWrapper,
} from "../SetBusinessCategoryModal/StyledComponent";
import RightArrowTailedIcon from "../../consts/icons/rightArrowTailed";

const StyledContainer = styled.div`
  height: 500px;
`;
const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ColumnsHeaders = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
  justify-content: center;
  gap: 100px;
`;

const ColumnsFrameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 350px;
  overflow-y: auto;
  justify-content: center;
  gap: 165px;
`;

const StyledChangeInAmount = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
`;
interface IModalSummary {
  monthlyProgressFirstState: ModalMonthlyProgress[];
  monthlycategoriesProgressArr: ModalMonthlyProgress[];
  changedProgressIndxArr: number[];
  onBackClick: () => void;
  onSubmitClick: () => void;
}
export const ModalSummary: FC<IModalSummary> = ({
  monthlyProgressFirstState,
  monthlycategoriesProgressArr,
  changedProgressIndxArr,
  onBackClick,
  onSubmitClick,
}) => {
  const renderChange = () =>
    changedProgressIndxArr?.map((ind) => (
      <ColumnsHeaders>
        <StyledCategoriesButton displayFilter={false}>
          {monthlyProgressFirstState[ind].category}
        </StyledCategoriesButton>

        <StyledChangeInAmount>
          {monthlyProgressFirstState[ind].goal_amount}
          <RightArrowTailedIcon />
          <div style={{ color: "red" }}>
            {monthlycategoriesProgressArr[ind].goal_amount}
          </div>
        </StyledChangeInAmount>
      </ColumnsHeaders>
    ));

  return (
    <>
      <StyledContainer>
        <ColumnsHeaders>
          <h2>{"Category change summary"}</h2>
        </ColumnsHeaders>
        <ColumnsFrameWrapper>
          <StyledContent>{renderChange()}</StyledContent>
        </ColumnsFrameWrapper>
      </StyledContainer>
      <ButtonWrapper>
        <NavigationButtonsWrapper>
          <button onClick={() => onBackClick()}> Back </button>
        </NavigationButtonsWrapper>
        <SubmitButtonWrapper>
          <button onClick={() => onSubmitClick()}> Submit!</button>
        </SubmitButtonWrapper>
      </ButtonWrapper>
    </>
  );
};
