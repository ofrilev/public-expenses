import { FC, createRef, useEffect, useRef, useState } from "react";
import { CategoriesObjArr } from "../../models/models";
import { ProgressBar } from "./ProgressBar/ProgressBar";
import {
  ContentWrapper,
  ProgressBox,
  ProgressWarpper,
  ProgressesContainer,
} from "./StyledComponents";
import { Modal } from "../ChangeExpenseCategoryModal/Modal";
import Popup from "../EmptyBusinessModal/PopUp";
import { ModalStepControlller } from "../ChangeMonthlyProgressModal/ModalStepController";
import { IMonthlyProgressWidgetWrapper } from "./MonthlyProgressWidgetWrapper";
import { StyledCategoryName } from "./ProgressBar/StyledComponents";
import { AvgRatioMonthData } from "../ChangeMonthlyProgressModal/ChangeMonthlyProgress/FilterDateAvgComponents/fetchAvgMonthData";
import { BreakDownByCategory } from "./utils";
import { MonthlyProgress } from "../../models/fetch/monthlyProgress";
import { todayMonth, todayYear } from "../../consts/common/dateToday";

export interface IMonthlyProgressWidget extends IMonthlyProgressWidgetWrapper {
  progressBreakDown: BreakDownByCategory;
  AvgRatioMonthData: AvgRatioMonthData[];
  categoriesObjArr: CategoriesObjArr;
}
interface IPopupModal {
  AvgRatioMonthData: AvgRatioMonthData[];
  categoriesObjArr: CategoriesObjArr;
  monthlyProgressData: MonthlyProgress[];
}
const PopUpModal = ({
  AvgRatioMonthData,
  categoriesObjArr,
  monthlyProgressData,
}: IPopupModal) => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleClose = () => {
    setModalOpen(false);

    //todo: add fetch and set to progress
  };
  return (
    <div>
      <Popup
        title={"change progress"}
        onClick={() => setModalOpen(!modalOpen)}
        isModalOpen={modalOpen}
      />
      {
        <Modal
          isOpen={modalOpen}
          onClose={handleClose}
          contentWrapperHeight={80}
        >
          <ModalStepControlller
            AvgRatioMonthData={AvgRatioMonthData}
            monthlyProgress={monthlyProgressData}
            categoriesObjArr={categoriesObjArr}
            handleClose={handleClose}
          />
        </Modal>
      }
    </div>
  );
};

export const MonthlyProgressWidget: FC<IMonthlyProgressWidget> = ({
  categoriesObjArr,
  progressBreakDown,
  AvgRatioMonthData,
  monthlyProgressData,
}) => {
  const [calcultePositionsArr, setCalcultePositionsArr] = useState<
    { top: number; bottom: number }[]
  >([{ top: 0, bottom: 0 }]);
  const progressBarRefs = useRef([]);
  progressBarRefs.current = monthlyProgressData?.map(
    (_, i) => progressBarRefs.current[i] ?? createRef()
  );
  const calculatePositions = () => {
    const positions = progressBarRefs.current?.map((ref) => {
      //@ts-ignore
      const rect = ref.current.getBoundingClientRect();
      //@ts-ignore
      const containerRect = document
        .querySelector(".ProgressesContainer")
        .getBoundingClientRect();

      // Adjusting the position relative to the container
      const topRelativeToContainer = rect.top - containerRect.top;
      const bottomRelativeToContainer = rect.bottom - containerRect.top;

      return { top: topRelativeToContainer, bottom: bottomRelativeToContainer };
    });
    return positions;
  };
  useEffect(() => {
    const tempPositions = calculatePositions();
    setCalcultePositionsArr(tempPositions);
  }, []);

  return (
    <>
      <PopUpModal
        monthlyProgressData={monthlyProgressData}
        categoriesObjArr={categoriesObjArr}
        AvgRatioMonthData={AvgRatioMonthData}
      />
      {progressBreakDown && AvgRatioMonthData && monthlyProgressData && (
        <ContentWrapper>
          <h2>{`Monthly Progress of ${todayMonth("MMMM")}, ${todayYear(
            "YYYY"
          )}`}</h2>
          <ProgressBox>
            <ProgressesContainer className="ProgressesContainer">
              {monthlyProgressData?.map((item, index) => (
                <ProgressWarpper
                  key={item.category}
                  ref={progressBarRefs.current[index]}
                  breakDownPosition={index % 2 === 0}
                >
                  <ProgressBar
                    key={item.category}
                    breakDownPosition={index % 2 === 0}
                    //@ts-ignore
                    breakDownData={progressBreakDown[index]?.breakDown}
                    calculatePosition={calcultePositionsArr[index]}
                    //@ts-ignore
                    value={item?.currentAmount}
                    totalValue={item?.goal_amount}
                  />
                  <StyledCategoryName>{item.category}</StyledCategoryName>
                </ProgressWarpper>
              ))}
            </ProgressesContainer>
          </ProgressBox>
        </ContentWrapper>
      )}
    </>
  );
};
