import { FC, useState } from "react";
import { SetBusinessCategoryModal } from "../SetBusinessCategoryModal/SetBusinessCategoryModal";
import { ModalPopUpText } from "./consts";
import Popup from "./PopUp";
import { Modal } from "../ChangeExpenseCategoryModal/Modal";
import { putReq } from "../../utils/useFetch";
import { BusinessExpense } from "../../models/models";

export interface IModalContainer {
  initialState: BusinessExpense[];
  fetchAndSetNullExpensesCategories: any;
}

const ModalPopupContainer: FC<IModalContainer> = (props) => {
  const { initialState, fetchAndSetNullExpensesCategories } = props;
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const handleSubmit = (
    expensesCategoriesToUpdate: { category: string; business_name: string }[]
  ) => {
    if (expensesCategoriesToUpdate.length > 0) {
      putReq(`/expenses/category`, expensesCategoriesToUpdate)
        .then((res) => {
          res.status == 200
            ? console.log("Suceed update expenses categories")
            : console.error(
                `Failed to update expenses categories with err ${res.response}`
              );
          fetchAndSetNullExpensesCategories();
        })
        .finally(() => handleClose());
    }
  };

  const handleClose = () => setModalIsOpen(!modalIsOpen);
  return (
    <div>
      <Popup
        title={ModalPopUpText}
        onClick={() => setModalIsOpen(!modalIsOpen)}
        isModalOpen={modalIsOpen}
      />
      {
        <Modal
          isOpen={modalIsOpen}
          onClose={handleClose}
          contentWrapperHeight={0}
        >
          <SetBusinessCategoryModal
            initialState={initialState}
            handleSubmit={handleSubmit}
          />
        </Modal>
      }
    </div>
  );
};
export default ModalPopupContainer;
