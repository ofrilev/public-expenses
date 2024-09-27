import { FC, useState } from "react";

import {
  ButtonWrapper,
  NavigationButtonsWrapper,
} from "../../SetBusinessCategoryModal/StyledComponent";

import {
  StyledCategoriesButton,
  CategoriesWrapper,
  StyledSubCategories,
  StyledContentWrapper,
  FilterTotalAmount,
  StyledTotalAmountWrapper,
} from "./StyledComponents";
import { SubCategoriesDisplay } from "./SubCategoriesDisplay";
import { DateChooserComponent } from "../DateChooser/DateChoser";
import { ModalMonthlyProgress } from "../ModalStepController";
import { useFilteredcategoryData } from "./FilterDateAvgComponents/FilterDateAvgComponents";
import { AvgRatioMonthData } from "./FilterDateAvgComponents/fetchAvgMonthData";
import { FilterContainer } from "./FilterDateAvgComponents/StyledComponents";
import AnimatedSVG from "../../../consts/components/LoaderGif";
import { useLoading } from "../../loadingContext/LoadingContext";

interface IChangeExpenseCategoryModal {
  chosenDate: string;
  totalSum: number;
  firstState: ModalMonthlyProgress[];
  handleDateChange: (date: Date) => void;
  monthlyProgress: ModalMonthlyProgress[];
  handleMonthlyCategoryChange: (newState: ModalMonthlyProgress[]) => void;
  onNextClick: () => void;
  isNextVisible: boolean;
  avgRatioMonthData: AvgRatioMonthData[];
}

export const ChangeMonthlyProgressModal: FC<IChangeExpenseCategoryModal> = ({
  chosenDate,
  totalSum,
  firstState,
  handleDateChange,
  onNextClick,
  monthlyProgress,
  handleMonthlyCategoryChange,
  isNextVisible,
  avgRatioMonthData,
}: IChangeExpenseCategoryModal) => {
  const [chosenCategory, setChosenCategory] = useState<{
    category: string;
    id: number;
  }>({ category: "", id: -1 });

  const [avgRatioMonthDisplay] = useState(avgRatioMonthData);
  const { FilterChoser, filtered, filterRatio } = useFilteredcategoryData();
  const { loading } = useLoading();
  const onCategoryClick = (category: string, id: number) => {
    if (chosenCategory.category === category) {
      setChosenCategory({ category: "", id: -1 });
    } else {
      setChosenCategory({ category: category, id: id });
    }
  };
  return (
    <StyledContentWrapper>
      <div>
        {FilterChoser()}
        <h1>
          Change categories goal amount for
          <DateChooserComponent
            onDateChange={handleDateChange}
            chosenDate={chosenDate}
          />
        </h1>
        {loading ? (
          <AnimatedSVG />
        ) : (
          <div>
            <StyledTotalAmountWrapper>
              <h3>Total Amount {totalSum}</h3>
              {filtered && (
                <h3>
                  <FilterTotalAmount>
                    {avgRatioMonthDisplay
                      .filter(({ parent }) => parent === null)
                      .reduce(
                        (totalAvgSum, item) =>
                          //@ts-ignore
                          totalAvgSum + item[`Avg${filterRatio}`],
                        0
                      )}
                  </FilterTotalAmount>
                </h3>
              )}
            </StyledTotalAmountWrapper>
            <div>
              <CategoriesWrapper className="CategoriesWrapper">
                {monthlyProgress?.map(
                  ({ category, goal_amount, id, parentId }, index) =>
                    parentId === null && (
                      <div key={index}>
                        <StyledCategoriesButton
                          displayFilter={true}
                          style={
                            chosenCategory?.category === category
                              ? {
                                  backgroundColor: `hsl(0, 0%, 55%)`,
                                  borderRadius: "90px",
                                }
                              : {}
                          }
                          onClick={() => onCategoryClick(category, id)}
                          className="styled-button"
                        >
                          <div>{category}</div>
                          <div>{goal_amount}</div>
                        </StyledCategoriesButton>
                        {filtered && (
                          <FilterContainer>
                            {
                              //@ts-ignore
                              avgRatioMonthData.find((item) => item.id === id)[
                                `Avg${filterRatio}`
                              ]
                            }
                          </FilterContainer>
                        )}
                      </div>
                    )
                )}
              </CategoriesWrapper>
              <StyledSubCategories>
                <SubCategoriesDisplay
                  firstState={firstState}
                  monthlycategoriesProgressArr={monthlyProgress}
                  chosenCategory={chosenCategory}
                  handleMonthlyCategoryChange={handleMonthlyCategoryChange}
                  avgRatioMonthDisplay={avgRatioMonthDisplay}
                  filtered={filtered}
                  filterRatio={filterRatio}
                />
              </StyledSubCategories>
            </div>
          </div>
        )}
        <ButtonWrapper>
          <NavigationButtonsWrapper>
            {isNextVisible && (
              <button onClick={() => onNextClick()}> Next </button>
            )}
          </NavigationButtonsWrapper>
        </ButtonWrapper>
      </div>
    </StyledContentWrapper>
  );
};
