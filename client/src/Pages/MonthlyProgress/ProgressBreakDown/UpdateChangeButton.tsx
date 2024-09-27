import { FC, useState } from "react";
import { StyledChangeButton } from "./StyledComponents";
import { SubcategoriesBreakDown } from "../../../models/fetch/monthlyProgress";
import { postReq, putReq } from "../../../utils/useFetch";
import LoaderGif from "../../../../consts/components/LoaderGif";

interface UpdateChangesButtonProps {
  currentMonth: string;
  isChange: boolean;
  currentState: SubcategoriesBreakDown[];
  firstState: SubcategoriesBreakDown[];
  changeUpdating: (b: boolean) => void;
  isUpdating: boolean;
}
export const UpdateChangesButton: FC<UpdateChangesButtonProps> = ({
  changeUpdating,
  isUpdating,
  currentMonth,
  firstState,
  currentState,
  isChange,
}: UpdateChangesButtonProps) => {
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
        onChangeClick(currentState, firstState, changeUpdating, currentMonth)
      }
    >
      Update changes
    </StyledChangeButton>
  );
};
const onChangeClick = (
  currentState: SubcategoriesBreakDown[],
  firstState: SubcategoriesBreakDown[],
  changeUpdating: (b: boolean) => void,
  currentMonth: string
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
  if (itemsToPost.length > 0) {
    changeUpdating(true);
    postChangeItems(itemsToPost, changeUpdating);
  }
  if (itemsToUpdate.length > 0) {
    changeUpdating(true);
    updateChangedItems(itemsToUpdate, changeUpdating);
  }
};
const postChangeItems = (
  itemsToPost: { date: string; category: number; amount: number }[],
  callbackFunc: (b: boolean) => void
) => {
  postReq("monthly-progress", itemsToPost).then((res) => {
    if (res.status == 0) {
      console.log("added successfully");
    }
    callbackFunc(false);
  });
};
const updateChangedItems = (
  itemsToUpdate: { id: number; amount: number }[],
  callbackFunc: (b: boolean) => void
) => {
  putReq("monthly-progress/batch", itemsToUpdate).then((res) => {
    if (res.status === 200) {
      console.log("updated successfully");
    }
    callbackFunc(false);
  });
};
