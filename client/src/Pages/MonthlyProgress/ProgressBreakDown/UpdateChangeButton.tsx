import { FC, useState } from "react";
import { StyledChangeButton } from "./StyledComponents";
import { SubcategoriesBreakDown } from "../../../models/fetch/monthlyProgress";
import { postReq, putReq } from "../../../utils/useFetch";
import LoaderGif from "../../../../consts/components/LoaderGif";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { useCategoriesContext } from "../../../global/globalStates/CategoriesContext";
import { CategoriesObj } from "../../../models/models";
import { updateMonthlyProgress } from "../../Page";

interface UpdateChangesButtonProps {
  currentMonth: string;
  isChange: boolean;
  currentState: SubcategoriesBreakDown[];
  firstState: SubcategoriesBreakDown[];
  isUpdating: boolean;
}
export const UpdateChangesButton: FC<UpdateChangesButtonProps> = ({
  isUpdating,
  currentMonth,
  firstState,
  currentState,
  isChange,
}: UpdateChangesButtonProps) => {
  const dispatch = useDispatch();
  const { categoriesContext } = useCategoriesContext();
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  return isUpdating ? (
    <LoaderGif width={80} height={60} />
  ) : (
    <StyledChangeButton
      onMouseEnter={() => setIsButtonHovered(true)}
      onMouseLeave={() => setIsButtonHovered(false)}
      isChanged={isChange}
      isHovered={isButtonHovered}
      onClick={() =>
        onChangeClick(
          currentState,
          firstState,

          currentMonth,
          dispatch,
          categoriesContext
        )
      }
    >
      Update changes
    </StyledChangeButton>
  );
};
const onChangeClick = async (
  currentState: SubcategoriesBreakDown[],
  firstState: SubcategoriesBreakDown[],
  currentMonth: string,
  dispatch: Dispatch<any>,
  categoriesContext: CategoriesObj[]
) => {
  const itemsToUpdate: { id: number; amount: number }[] = [];
  const itemsToPost: {
    date: string;
    category: number;
    amount: number;
  }[] = [];
  const filtered = currentState.filter((item, index) => {
    return firstState[index].goal_amount !== item.goal_amount;
  });
  filtered.map((item) => {
    //add to items to post
    if (item.id == -1) {
      itemsToPost.push({
        date: currentMonth,
        category: item.categoryId,
        amount: item.goal_amount,
      });
    } else {
      itemsToUpdate.push(
        //add to items to update
        { id: item.id, amount: item.goal_amount }
      );
    }
  });

  let promises = new Array();
  if (itemsToPost.length > 0) {
    promises.push(postChangeItems(itemsToPost));
  }
  if (itemsToUpdate.length > 0) {
    promises.push(updateChangedItems(itemsToUpdate));
  }
  if (promises.length > 0) {
    updateMonthlyProgress(promises, dispatch, categoriesContext);
  }
};
const postChangeItems = async (
  itemsToPost: { date: string; category: number; amount: number }[]
) => {
  try {
    const res = await postReq("monthly-progress", itemsToPost);
    if (res.status == 0) {
      return res.response;
    }
  } catch (err) {
    console.log(err);
  }
};
const updateChangedItems = async (
  itemsToUpdate: { id: number; amount: number }[]
) => {
  try {
    const res = await putReq("monthly-progress/batch", itemsToUpdate);
    if (res.status === 200) {
      return res.response;
    }
  } catch (error) {
    console.log(error);
  }
};
