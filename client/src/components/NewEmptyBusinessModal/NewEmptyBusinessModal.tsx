import { FC, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  BottomSection,
  CategoriesWrapper,
  CategoyItem,
  CloseButton,
  InfoButtonWrapper,
  MiddleWrapper,
  ModalContent,
  ModalOverlay,
  RadioButton,
  SkipButton,
  StyledButton,
  StyledTitle,
  StyledTitleWrapper,
  SubCategoriesWrapper,
  SubcategoryGrid,
  SubcategoryItem,
  SubmitButton,
  UpperSection,
} from "./StyledComponents";

import { useCategoriesContext } from "../../global/globalStates/CategoriesContext";
import LeftArrowIcon from "../../../consts/icons/leftArrow";
import { CancelIcon } from "../sideBar/logos/CancelIcon";
import { InfoLogo } from "../sideBar/logos/InfoLogo";
import { UnkownBusinessNames } from "../../utils/fetch/getUnkownBusinessName";
import { ExpensesInfo } from "./ExpensesInfo";
import { submitChanges } from "./submitChanges";
import { color } from "../../../consts/colors";

interface ModalProps {
  data: UnkownBusinessNames;
  isOpen: boolean;
  onClose: () => void;
}
export type ChangedBusiness = {
  [businessName: string]: { newCategoryId: number };
};

export const NewEmptyBusinessModal: FC<ModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const [changedBusiness, setChangedBusiness] = useState<ChangedBusiness>();
  const [currentBusiness, setCurrentBusiness] = useState(0);
  const { categoriesHierarchy } = useCategoriesContext();
  const [chosenCategory, setChosenCategory] = useState<number>(-1);
  const [chosenSubCategory, setChosenSubCategory] = useState<number>();
  const [infoButtonHovered, setInfoButtonHovered] = useState(false);
  const [subcategories, setSubcategories] =
    useState<{ id: number; name: string }[]>();
  const handleChangeBusiness = (
    currentBusiness: number,
    categoryId: number
  ) => {
    const businessName = Object.keys(data)[currentBusiness];
    if (changedBusiness && changedBusiness[businessName]) {
      setChangedBusiness({
        ...changedBusiness,
        [businessName]: {
          ...changedBusiness[businessName],
          newCategoryId: categoryId,
        },
      });
    } else {
      setChangedBusiness({
        ...changedBusiness,
        [businessName]: { newCategoryId: categoryId },
      });
    }
  };

  const categories = Object.values(categoriesHierarchy);
  const infoData =
    data &&
    Object.values(data)[currentBusiness] &&
    Object.values(data)[currentBusiness].data;

  useEffect(() => {
    setChosenCategory(-1);
    setChosenSubCategory(-1);
    setInfoButtonHovered(false);
  }, [currentBusiness]);
  useEffect(() => {
    setChosenSubCategory(-1);
    chosenCategory > -1
      ? setSubcategories(categories[chosenCategory].children)
      : setSubcategories([]);
  }, [chosenCategory]);

  if (!isOpen) return null;
  return createPortal(
    <ModalOverlay onClick={(e) => e.stopPropagation()} className="ModalOverlay">
      <ModalContent className="ModalContent">
        <UpperSection>
          <StyledButton shouldShow={true}>
            {currentBusiness > 0 && (
              <LeftArrowIcon
                hoverColor={color["orange"][100]}
                height="42px"
                width="42px"
                onClick={() => setCurrentBusiness(currentBusiness - 1)}
              />
            )}
          </StyledButton>
          <StyledTitleWrapper className="StyledTitleWrapper">
            <StyledTitle>Define Category for businesses</StyledTitle>
            <p>{Object.keys(data)[currentBusiness]}</p>
            <InfoButtonWrapper>
              <InfoLogo
                onMouseEnter={() => setInfoButtonHovered(true)}
                onMouseLeave={() => {
                  setTimeout(() => {
                    setInfoButtonHovered(false);
                  }, 300);
                }}
              />
              {infoButtonHovered && <ExpensesInfo data={infoData} />}
            </InfoButtonWrapper>
          </StyledTitleWrapper>
          <CloseButton
            onClick={() => {
              onClose();
            }}
          >
            <CancelIcon viewBox="0 0 16 16" />
          </CloseButton>
        </UpperSection>
        <MiddleWrapper>
          <CategoriesWrapper className="CategoriesWrapper">
            {categories.map((value, index) => (
              <CategoyItem
                index={index}
                key={value.name}
                selected={chosenCategory === index}
                onClick={() => setChosenCategory(index)}
              >
                {value.name}
              </CategoyItem>
            ))}
          </CategoriesWrapper>
          {subcategories && (
            <SubcategoryGrid itemCount={subcategories?.length}>
              {subcategories?.map((subcategory, index) => (
                <SubcategoryItem
                  selected={chosenSubCategory === index}
                  onClick={() => {
                    handleChangeBusiness(currentBusiness, subcategory.id);
                    setChosenSubCategory(index);
                  }}
                >
                  <RadioButton selected={chosenSubCategory === index} />
                  <>{subcategory.name}</>
                </SubcategoryItem>
              ))}
            </SubcategoryGrid>
          )}
          {/* </SubCategoriesWrapper> */}
        </MiddleWrapper>
        <BottomSection className="BottomSection">
          <SkipButton
            onClick={() => setCurrentBusiness(currentBusiness + 1)}
            aria-disabled={currentBusiness === Object.keys(data).length - 1}
          >
            Skip
          </SkipButton>
          <SubmitButton
            disabled={changedBusiness === undefined}
            onClick={() => {
              onClose();
              if (changedBusiness) {
                submitChanges(changedBusiness);
              }
            }}
          >
            Submit
          </SubmitButton>
        </BottomSection>
      </ModalContent>
    </ModalOverlay>,
    document.getElementById("portal") as HTMLElement
  );
};
