import styled from "styled-components";
import { Colors } from "../../consts/colors";
// import {SharedUtils} from "shared-utils";
/* styles.css (or any other CSS file) */
const color = new Colors();

export const ModalContent = styled.div`
  background-color: #e6e9ec;
  border-radius: 8px;
  padding: 20px;
  max-width: 2875px;
  width: 90%;
  text-align: center;
  button {
    font-size: 16px;
    border-radius: 10px;
  }
`;

// Styled component for the business names div
export const BusinessNamesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 20px;
  font-weight: bold;
  gap: 10px;
  margin-bottom: 17px;
`;

// Styled component for the categories wrapper
export const CategoriesWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: bold;
  button {
    padding: 10px 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    cursor: pointer;
    background-color: #6b95ff;
    color: #243c7b;

    &:hover {
      transition: background-color 0.2s ease-in-out;
      background-color: #94b2fe;
    }
  }
`;

export const SubCategoriesWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
  button {
    padding: 10px 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    cursor: pointer;
    background-color: #b8ccfe;
    color: #243c7b;

    &:hover {
      transition: background-color 0.2s ease-in-out;
      background-color: #e3ebff;
    }
  }
`;

// Styled component for the go back button div
export const NavigationButtonsWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
  gap: 20px;
  &:disabled {
    cursor: not-allowed;
    color: #f1f3f4;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 40px;
  button {
    padding: 10px 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    cursor: pointer;
    background-color: #cbd1d7;
    color: #435993;

    &:hover {
      background-color: #e6e9ec;
    }
  }
`;

export const CloseButtonWrapper = styled.div`
  margin-bottom: 20px;
  display: flex;
  gap: 20px;
  button {
    background-color: #243c7b;
    color: #d6e4f2;
    &:hover {
      background-color: #6f7eab;
    }
  }
`;
export const SubmitButtonWrapper = styled.div`
  margin-bottom: 20px;
  display: flex;
  gap: 20px;
  button {
    background-color: #49e1b3;
    color: #243c7b;
    &:hover {
      background-color: #82f0cf;
    }
  }
`;
export const StyledButton = styled.button<{ disabled: boolean }>`
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;
export const TooltipWrapper = styled.div`
  left: 0;
  right: 0;
  height: 30px;
  width: 30px;
  cursor: pointer;
  margin: auto;
`;

export const TooltipContent = styled.div`
  cursor: auto;
  opacity: 0;
  visibility: hidden;
  position: relative;
  width: 300px;
  z-index: 1000;
  background-color: #e6e9ec;
  border: 4px solid ${color.carbon["200"]};
  border-radius: 6px;
  top: 47%;
  right: 440%;
  transition: opacity 0.3s ease, visibility 0.1s ease 0.3s; /* Added delay to visibility transition */

  ::before {
    content: " ";
    position: absolute; // This ensures the arrow appears above the tooltip.
    z-index: 1500;
    top: -31px;
    left: 47%;
    transform: translateX(-50%); // Fine-tunes the centering.
    border-width: 15px; // Adjusted for a smaller arrow.
    border-style: solid;
    border-color: transparent transparent ${color.carbon["200"]} transparent; // Creates the arrow shape.
  }

  ${TooltipWrapper}:hover & {
    opacity: 1; // Make it visible
    visibility: visible;
    //transition-delay: 0.5s;
    transition-delay: 0s; /* Reset delay when showing tooltip */

    //transition: opacity 0.3s ease, visibility 0.5s,top 0.3s ease;
  }
`;
export const ScrollableDiv = styled.div`
  overflow-y: auto;
  display: flex;
  justify-content: center;
  max-height: 200px;
`;
