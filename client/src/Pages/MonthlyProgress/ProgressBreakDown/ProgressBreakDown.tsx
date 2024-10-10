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
import { UpdateChangesButton } from "./UpdateChangeButton";
import { Toast } from "../../../components/toastBar/ToastBar";
import { ToastBarComponent } from "./SubcategoriesProgress/ToastBarComponent";
interface Props {
  currentMonth: string;
  subCategoriesBreakDown: SubcategoriesBreakDown[];
}
export const ProgressBreakDown: FC<Props> = ({
  subCategoriesBreakDown,
  currentMonth,
}: Props) => {
  const [editMode, setEditMode] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [isUpdateing, setIsUpdating] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const firstState = subCategoriesBreakDown;
  const [currentState, setCurrentState] = useState<SubcategoriesBreakDown[]>(
    subCategoriesBreakDown
  );
  const changeUpdating = (b: boolean) => {
    if (b == false) {
      setShowToast(true);
    }
  };

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
            changeUpdating={changeUpdating}
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
      <Toast
        show={showToast}
        duration={4000}
        onClose={() => setShowToast(false)}
        renderCustomComponent={() => <ToastBarComponent />}
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
