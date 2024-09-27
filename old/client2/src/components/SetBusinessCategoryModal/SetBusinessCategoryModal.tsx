import { useState } from "react";
import {
  CategoriesWrapper,
  SubCategoriesWrapper,
  BusinessNamesWrapper,
  ButtonWrapper,
  NavigationButtonsWrapper,
  StyledButton,
  SubmitButtonWrapper,
  ScrollableDiv,
  TooltipWrapper,
  TooltipContent,
} from "./StyledComponent";
import { useCategoriesContext } from "../categoriesContext/CategoriesContext";
import { CategoriesObj, BusinessExpense } from "../../models/models";
import Tooltip from "../../consts/icons/tooltip";
import DataTable from "../Tables/Table";

interface IUseModal {
  initialState: BusinessExpense[];
  handleSubmit: (
    businessToUpdate: { business_name: string; category: string }[]
  ) => void;
}

type BusinessItem = {
  business_name: string;
  category: string;
};

export const SetBusinessCategoryModal = ({
  initialState,
  handleSubmit,
}: IUseModal) => {
  const { categoriesContext } = useCategoriesContext();
  const categories = Object.values(categoriesContext).filter(
    (item) => item.parent == null
  );

  const initialBusinessItems = initialState.map((item) => ({
    business_name: item.business_name,
    category: "",
  }));

  const [lastState, setLastState] =
    useState<BusinessItem[]>(initialBusinessItems);
  const [selectedCategory, setSelectedCategory] = useState<CategoriesObj>();
  const [businessInd, setBusinessInd] = useState<number>(0);
  const [isAnyCategorySet, setIsAnyCategorySet] = useState(false);
  const isFinishBusinesses = businessInd >= initialState.length;

  const handleOptionClick = (business_name: string, subCategory: string) => {
    const updatedState = lastState.map((item) =>
      item.business_name === business_name
        ? { ...item, category: subCategory }
        : item
    );
    setLastState(updatedState);
    if (!isAnyCategorySet) {
      setIsAnyCategorySet(true);
    }
    setBusinessInd(businessInd + 1); // Move to next business after selection
  };

  const handleSkipClick = () => {
    setSelectedCategory(undefined);
    setBusinessInd(businessInd + 1);
  };

  const handleBackClick = () => {
    setSelectedCategory(undefined);
    setBusinessInd(businessInd > 0 ? businessInd - 1 : 0);
  };

  const handleFilteredSubmit = () => {
    const filteredState = lastState.filter((item) => item.category !== "");
    handleSubmit(filteredState);
  };
  return (
    <>
      <h2>
        {isFinishBusinesses ? "Finish!" : "Define category for businesses"}
      </h2>
      <BusinessNamesWrapper>
        <div>
          {!isFinishBusinesses && initialState[businessInd].business_name}
        </div>
        <TooltipWrapper>
          <Tooltip />
          <TooltipContent>
            <ScrollableDiv>
              {DataTable({
                columnNames: ["amount", "date"],
                data: initialState[businessInd]?.breakDown,
              })}
            </ScrollableDiv>
          </TooltipContent>
        </TooltipWrapper>
      </BusinessNamesWrapper>
      <div>
        <CategoriesWrapper>
          {categories.map(
            (category, index) =>
              !isFinishBusinesses && (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(category)}
                  style={
                    selectedCategory === category
                      ? { backgroundColor: `hsl(0, 0%, 55%)` }
                      : {}
                  }
                >
                  {category.name}
                </button>
              )
          )}
        </CategoriesWrapper>
        {selectedCategory && (
          <SubCategoriesWrapper>
            {Object.values(categoriesContext)
              .filter(({ parent }) => parent === selectedCategory.id)
              .map((subCategory, index) => (
                <button
                  style={
                    subCategory.name === lastState?.[businessInd]?.category
                      ? { backgroundColor: `hsl(0, 0%, 60%)` }
                      : {}
                  }
                  key={index}
                  onClick={() =>
                    handleOptionClick(
                      initialBusinessItems[businessInd].business_name,
                      subCategory.name
                      // initialState[businessInd].business_name
                    )
                  }
                >
                  {subCategory.name}
                </button>
              ))}
          </SubCategoriesWrapper>
        )}
      </div>
      <ButtonWrapper>
        <NavigationButtonsWrapper>
          <StyledButton
            disabled={businessInd === 0}
            onClick={() => handleBackClick()}
          >
            go back
          </StyledButton>
          <StyledButton
            disabled={businessInd + 1 >= initialState.length}
            onClick={() => handleSkipClick()}
          >
            skip
          </StyledButton>
        </NavigationButtonsWrapper>
        <SubmitButtonWrapper>
          {isAnyCategorySet && (
            <button onClick={() => handleFilteredSubmit()}>submit!</button>
          )}
        </SubmitButtonWrapper>
      </ButtonWrapper>
    </>
  );
};
