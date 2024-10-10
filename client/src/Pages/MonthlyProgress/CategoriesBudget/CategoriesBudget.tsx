import { FC } from "react";
import { color } from "../../../../consts/colors";
import { BudgetGrid, CategoryBudgetWidget, Title } from "./StyledComponents";
import { CategoriesCircularProgress } from "./CategoriesCircularProgress/CategoriesCircularBar";
import { CategoriesBreakDown } from "../../../models/fetch/monthlyProgress";

const progressColor = color.ProgressColors_1;

interface Props {
  categoriesBreakDown: CategoriesBreakDown[] | undefined;
  onCategoryChange: (category: number) => void;
  currentCategory: number;
}

export const CategoriesBudget: FC<Props> = ({
  categoriesBreakDown,
  currentCategory,
  onCategoryChange,
}: Props) => {
  const handleSelect = (index: number) => {
    onCategoryChange(index);
  };

  const renderBudgetBar = (): JSX.Element[] => {
    let arr: JSX.Element[] = [];
    if (!categoriesBreakDown) return [];
    for (let i = 0; i < categoriesBreakDown.length; i++) {
      const data = categoriesBreakDown[i];
      const isSelected = i === currentCategory;
      arr.push(BudgetCategoryBar(i, handleSelect, isSelected, data));
    }
    return arr;
  };
  const bars = renderBudgetBar();
  return <BudgetGrid>{bars}</BudgetGrid>;
};
const BudgetCategoryBar = (
  index: number,
  handleSelect: (index: number) => void,
  isSelected: boolean,
  data: CategoriesBreakDown
) => {
  return (
    <CategoryBudgetWidget
      selected={isSelected}
      className="grid-item"
      onClick={() => handleSelect(index)}
    >
      <Title>{data.category}</Title>
      {CategoriesCircularProgress({
        data: { spent: data.currentAmount, budget: data.goal_amount },
        width: 130,
        height: 130,
        fontSize: 12,
        color: progressColor[index],
      })}
    </CategoryBudgetWidget>
  );
};
