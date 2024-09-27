import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import {
  Progress,
  StyledInput,
  StyledStats,
  StyledSubcategoryTitle,
  SubacategoriesGrid,
  SubcategoriesFrame,
  SubcategoriesItemUpperSection,
  SubcategoriesItemWrapper,
} from "./StyledComponents";
import { ProgressBarContainer } from "./StyledComponents";
import { color } from "../../../../../consts/colors";
import { SubcategoriesBreakDown } from "../../../../models/fetch/monthlyProgress";

const progressColors = color.ProgressColors_1;
color.shuffleArrayInPlace(progressColors);

interface IRenderSubcategoriesItems {
  handleItemChange: (i: number, goalAmount: number) => void;
  // changeCurrentState: (i: number, goalAmount: number) => void;
  data: SubcategoriesBreakDown;
  index: number;
  isEditMode?: boolean;
  changeIndexFocused: (index: number) => void;
  isFocusedIndex: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
}

const RenderSubcategoriesItems: FC<IRenderSubcategoriesItems> = ({
  data,
  index,
  isFocusedIndex,
  changeIndexFocused,
  isEditMode,
  inputRef,
}: IRenderSubcategoriesItems) => {
  const [isValueChanged, setIsValueChanged] = useState(false);
  const handleBlur = (e: any) => {
    const value = e.target.value ?? "";
    // if (inputRef.current && inputRef.current.value) {
    //   inputRef.current.value = value;
    // }
    if (value === data.goal_amount.toString()) {
      setIsValueChanged(false);
    } else {
      setIsValueChanged(true);
    }
  };
  return (
    <SubcategoriesFrame
      isFocusedIndex={isFocusedIndex}
      key={index}
      isEditMode={isEditMode}
    >
      <SubcategoriesItemWrapper
        onClick={() => {
          if (isEditMode) {
            changeIndexFocused(index);
            inputRef.current?.focus();
          }
        }}
      >
        <SubcategoriesItemUpperSection>
          <StyledSubcategoryTitle isEditMode={isEditMode}>
            {data.subcategory}
          </StyledSubcategoryTitle>
          {isEditMode && (
            <StyledInput
              onBlur={(e) => {
                handleBlur(e);
              }}
              isValueChange={isValueChanged}
              placeholder={data.goal_amount.toString()}
              ref={inputRef} // Dynamically assigned ref here
              isFocused={isFocusedIndex}
            />
          )}
          <StyledStats>{`${data.currentAmount}/${data.goal_amount}`}</StyledStats>
        </SubcategoriesItemUpperSection>
        <ProgressBarContainer>
          <Progress value={data.currentAmount} color={progressColors[index]} />
        </ProgressBarContainer>
      </SubcategoriesItemWrapper>
    </SubcategoriesFrame>
  );
};

interface Props {
  isEditMode: boolean;
  subCategoriesBreakDown: SubcategoriesBreakDown[];
  changeCurrentState: (index: number, value: number) => void;
}

export const SubcategoriesProgressRegular: FC<Props> = ({
  isEditMode,
  subCategoriesBreakDown,
  changeCurrentState,
}: Props) => {
  const [focusedIndex, setFocusedIndex] = useState(-1);

  let refsById = useMemo(() => {
    const refs: Record<number, React.RefObject<HTMLInputElement>> = {};
    subCategoriesBreakDown.forEach((item, index) => {
      refs[index] = React.createRef<HTMLInputElement>();
    });
    return refs;
  }, [subCategoriesBreakDown]);

  useEffect(() => {
    subCategoriesBreakDown.forEach((item, index) => {
      if (refsById[index].current) {
        refsById[index].current.value = item.goal_amount.toString();
      }
    });
  }, [subCategoriesBreakDown, refsById]);

  // const changeCurrentState = (i: number, goalAmount: number) => {
  //   console.log("changeCurrentState called");
  //   if (subCategoriesBreakDown[i].goal_amount !== goalAmount) {
  //     subCategoriesBreakDown[i].goal_amount = goalAmount;
  //     didFirstStateChange(subCategoriesBreakDown);
  //   }
  // };

  const getItems = () => {
    let arr: React.JSX.Element[] = [];
    // inputRefs[i] = useRef<HTMLInputElement>(null);
    subCategoriesBreakDown?.map((data, i) => {
      const isFocusedIndex = i === focusedIndex;
      arr.push(
        <RenderSubcategoriesItems
          key={i}
          index={i}
          data={data}
          isEditMode={isEditMode}
          changeIndexFocused={changeIndexFocused}
          isFocusedIndex={isFocusedIndex}
          handleItemChange={handleItemChange}
          inputRef={refsById[i]}
        />
      );
    });

    return arr;
  };

  const handleItemChange = (i: number, goalAmount: number) => {
    changeCurrentState(i, goalAmount);
  };

  const changeIndexFocused = (index: number) => {
    console.log("changeIndexFocused called");
    if (focusedIndex >= 0 && refsById[focusedIndex].current) {
      const val = Number(refsById[focusedIndex].current.value);
      if (val >= 0) {
        handleItemChange(focusedIndex, val);
      }
    }
    setFocusedIndex(index);
  };

  return (
    <SubacategoriesGrid isEditMode={isEditMode} rows={7}>
      {getItems()}
    </SubacategoriesGrid>
  );
};
