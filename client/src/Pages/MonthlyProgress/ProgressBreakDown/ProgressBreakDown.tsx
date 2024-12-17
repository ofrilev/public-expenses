import { FC, useEffect, useState } from "react";
import {
  ButtonsWrapper,
  CategoryTitle,
  ProgressUpperSection,
  StyledEditButton,
  ToggleBarWrapper,
  ToggleCircle,
} from "./StyledComponents";
import { SubcategoriesProgressRegular } from "./SubcategoriesProgress/SubcategoryProgress";
import { SubcategoriesBreakDown } from "../../../models/fetch/monthlyProgress";
import { UpdateChangesButton } from "./UpdateChangeButton";interface Props {
  currentMonth: string;
  subCategoriesBreakDown: SubcategoriesBreakDown[];
}
export const ProgressBreakDown: FC<Props> = ({
  subCategoriesBreakDown,
  currentMonth,
}: Props) => {
  const [editMode, setEditMode] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [isUpdateing] = useState(false);

  const firstState = subCategoriesBreakDown;
  const [currentState, setCurrentState] = useState<SubcategoriesBreakDown[]>(
    subCategoriesBreakDown
  );

  useEffect(() => {
    setCurrentState(subCategoriesBreakDown);
  }, [subCategoriesBreakDown]);

  const changeCurrentState = (index: number, value: number) => {
    setCurrentState((prev) =>
      prev.map((item, i) => {
        if (i === index) {
          return { ...item, goal_amount: value };
        }
        return item;
      })
    );
  };

  const didFirstStateChange = (newCurrentState: SubcategoriesBreakDown[]) => {
    let equal = true;
    for (let i = 0; i < firstState.length; i++) {
      if (firstState[i].goal_amount !== newCurrentState[i].goal_amount) {
        equal = false;
        if (!isChange) {
          setIsChange(true);
        }
        return;
      }
    }
    if (equal && isChange) {
      setIsChange(false);
      return;
    }
  };
  useEffect(() => {
    didFirstStateChange(currentState);
  }, [currentState]);

  return (
    <>
      <ProgressUpperSection>
        <CategoryTitle>Category</CategoryTitle>
        <ButtonsWrapper>
          <UpdateChangesButton
            isUpdating={isUpdateing}
            currentMonth={currentMonth}
            isChange={isChange}
            currentState={currentState}
            firstState={firstState}
          />
          <ToggleBar isToggled={editMode} setIsToggled={setEditMode} />
        </ButtonsWrapper>
      </ProgressUpperSection>
      <SubcategoriesProgressRegular
        changeCurrentState={changeCurrentState}
        isEditMode={editMode}
        subCategoriesBreakDown={currentState}
      />
    </>
  );
};
interface ToggleProps {
  isToggled: boolean;
  setIsToggled: (isToggled: boolean) => void;
}
const ToggleBar: FC<ToggleProps> = ({
  isToggled,
  setIsToggled,
}: ToggleProps) => {
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const toggle = () => {
    setIsToggled(!isToggled);
  };
  return (
    <StyledEditButton
      isHovered={isButtonHovered}
      onMouseEnter={() => setIsButtonHovered(true)}
      onMouseLeave={() => setIsButtonHovered(false)}
      onClick={toggle}
    >
      <div>Edit Mode</div>
      <ToggleBarWrapper isToggled={isToggled}>
        <ToggleCircle isToggled={isToggled} />
      </ToggleBarWrapper>
    </StyledEditButton>
  );
};
