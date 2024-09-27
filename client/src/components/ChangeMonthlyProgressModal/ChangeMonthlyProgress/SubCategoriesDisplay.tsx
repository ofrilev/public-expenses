import { FC, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ModalMonthlyProgress } from "../ModalStepController";
import { StyledCategoriesButton } from "./StyledComponents";
import { color } from "../../../consts/colors";
import { updateParentAmount } from "./utils";
import { AvgRatioMonthData } from "./FilterDateAvgComponents/fetchAvgMonthData";

import { FilterContainer } from "./FilterDateAvgComponents/StyledComponents";

const EditableDivContainer = styled.div`
  cursor: pointer;
  height: 100%;
`;

const GoalAmount = styled.span<{
  editMode: boolean;
  isEqualToFirstState: boolean;
}>`
  color: ${(props) =>
    props.isEqualToFirstState ? color.carbon[500] : color.red[400]};
  box-shadow: 0cap;
  font-weight: 200;
  display: ${(props) => (props.editMode ? "none" : "inline-block")};
`;

const Input = styled.input<{ editMode: boolean; isVisible: boolean }>`
  pointer-events: ${(props) => (props.editMode ? "auto" : "none")};
  width: 66px;
  display: ${(props) => (props.editMode ? "inline-block" : "none")};
  display: ${(props) => (props.isVisible ? "block" : "none")};
`;

interface ISubCategoriesDisplay {
  monthlycategoriesProgressArr: ModalMonthlyProgress[];
  chosenCategory: { id?: number; category?: string };
  firstState: ModalMonthlyProgress[];
  handleMonthlyCategoryChange: (newState: ModalMonthlyProgress[]) => void;
  avgRatioMonthDisplay?: AvgRatioMonthData[];
  filtered: boolean;
  filterRatio: number;
}

export const SubCategoriesDisplay: FC<ISubCategoriesDisplay> = ({
  monthlycategoriesProgressArr,
  chosenCategory,
  firstState,
  avgRatioMonthDisplay,
  handleMonthlyCategoryChange,
  filtered,
  filterRatio,
}) => {
  console.log(`in subcategories filtered is now ${filtered}`);
  const [subCategoriesAmount, setSubCategoriesAmount] = useState<
    ModalMonthlyProgress[]
  >(monthlycategoriesProgressArr);
  const [activeField, setActiveField] = useState<number | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus the input of the active div
    if (activeField !== null) {
      inputRefs.current[activeField]?.focus();
    }
  }, [activeField]);

  const handleInputChange = (
    value: string,
    index: number,
    parentId: number
  ) => {
    const newNum = isNaN(Number(value)) ? undefined : Number(value);
    //@ts-ignore
    setSubCategoriesAmount((prev) => {
      return prev.map((item, i) =>
        i === index ? { ...item, goal_amount: newNum } : item
      );
    });
    const newState = subCategoriesAmount.map((item, i) =>
      i === index ? { ...item, goal_amount: newNum } : item
    );
    //@ts-ignore
    updateParentAmount(parentId, newState, handleMonthlyCategoryChange);
  };
  return (
    <>
      {subCategoriesAmount?.map(
        ({ category: subCategory, goal_amount, parentId, id }, index) =>
          parentId === chosenCategory?.id && (
            <div>
              <StyledCategoriesButton
                key={index}
                onClick={() =>
                  setActiveField(activeField === index ? 0 : index)
                }
                displayFilter={true}
                className="StyledCategoriesButton"
              >
                {subCategory}
                <EditableDivContainer>
                  {goal_amount !== 0 && (
                    <GoalAmount
                      editMode={activeField === index}
                      isEqualToFirstState={
                        firstState[index].goal_amount === goal_amount
                      }
                    >
                      {goal_amount}
                    </GoalAmount>
                  )}
                  <Input
                    id={`${index}field`}
                    isVisible={activeField === index}
                    editMode={activeField === index}
                    type="text"
                    value={goal_amount || ""}
                    onChange={(e) =>
                      //@ts-ignore
                      handleInputChange(e.target.value, index, parentId)
                    }
                    ref={(el) => (inputRefs.current[index] = el)}
                  />
                </EditableDivContainer>
              </StyledCategoriesButton>
              {filtered && (
                <FilterContainer>
                  {
                    //@ts-ignore
                    avgRatioMonthDisplay.find((item) => item.id === id)[
                      `Avg${filterRatio}`
                    ]
                  }
                </FilterContainer>
              )}
            </div>
          )
      )}
    </>
  );
};
