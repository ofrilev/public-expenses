import { FC, useCallback, useEffect, useState } from "react";
import {
  ContextState,
  useBreakDownDataContext,
} from "./expensesCategoryContext";
import { CategoryMonthlyExpenses } from "../../models/expensesCategoryWidget/pieChart";
import { renderDropDowns } from "./utils";
import { DropDownContainer } from "./StyledComponent";

// import {RenderDropDown} from "./utils";

export interface Props {
  data: CategoryMonthlyExpenses;
}

export const DropDownStateController: FC<Props> = ({ data }) => {
  const [dropDownState, setDropDownState] = useState<ContextState>({});
  const { contextState, updateContextState } = useBreakDownDataContext();

  useEffect(() => {
    if (dropDownState?.month != contextState.month) {
      setDropDownState({ ...dropDownState, month: contextState.month });
    }
    if (dropDownState?.category != contextState.category) {
      setDropDownState({ ...dropDownState, category: contextState.category });
    }
    if (dropDownState?.subCategory != contextState.subCategory) {
      setDropDownState({
        ...dropDownState,
        subCategory: contextState.subCategory,
      });
    }
    if (dropDownState?.business_name != contextState.business_name) {
      setDropDownState({
        ...dropDownState,
        business_name: contextState.business_name,
      });
    }
  }, [contextState]);

  useCallback(
    () => renderDropDowns(data, dropDownState, updateContextState),
    [dropDownState]
  );

  return (
    <DropDownContainer>
      {renderDropDowns(data, dropDownState, updateContextState)}
    </DropDownContainer>
  );
};
