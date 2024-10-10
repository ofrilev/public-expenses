import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUnkownBusinessName,
  RootState,
} from "../../global/globalStates/store/store";
import LoaderGif from "../../../consts/components/LoaderGif";
import { CircleWithText, StyledModalButton } from "./StyledComponent";

interface Props {
  openModal: () => void;
}

let triggerFetchUnknownBusinessName: () => void = () => {};

const UnkownBusinessCategories: FC<Props> = ({ openModal }: Props) => {
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state?.data?.loading);
  const { unkownBusinessName } = useSelector(
    (state: RootState) => state.data.data
  );
  const [itemsToUpdate, setItemsToUpdate] = useState(0);

  useEffect(() => {
    dispatch(fetchUnkownBusinessName());
  }, [dispatch]);

  useEffect(() => {
    if (unkownBusinessName && Object.keys(unkownBusinessName).length > 0) {
      setItemsToUpdate(Object.keys(unkownBusinessName).length);
    }
  }, [loading, unkownBusinessName]);

  // Function to trigger fetch when called externally
  triggerFetchUnknownBusinessName = () => {
    dispatch(fetchUnkownBusinessName());
  };

  return (
    <StyledModalButton>
      {loading ? (
        <LoaderGif width={37} height={37} />
      ) : (
        <CircleWithText onClick={openModal}>{itemsToUpdate}</CircleWithText>
      )}
    </StyledModalButton>
  );
};

// Export the function to trigger fetch from outside
export { triggerFetchUnknownBusinessName };

export default UnkownBusinessCategories;
