// useDropdown.tsx
import { useState } from "react";
import styled from "styled-components";
import { Filter } from "./types";
import { color } from "../../../../../consts/colors";
import Chevron from "../../../../../consts/icons/chevron";
// Styled Components
const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
  min-width: 83px;
`;

const DropdownButton = styled.button<{ disabled: boolean }>`
  cursor: pointer;
  background: ${(props) =>
    props.disabled ? color.carbon["100"] : color.carbon["500"]};
  color: ${(props) =>
    props.disabled ? color.carbon["100"] : color.carbon["500"]};
  width: 100%;
  padding: 8px;
  text-align: left;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > span {
    color: ${(props) =>
      props.disabled ? color.carbon["100"] : color.carbon["500"]};
  }
`;

const DropdownList = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 4px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  z-index: 1000;
`;

const DropdownItem = styled.div`
  margin-top: 5px;
  display: flex;
  justify-content: center;
  width: inherit;
  cursor: pointer;
  &:hover {
    background-color: ${color.blue[100]};
  }
`;

const PlaceholderText = styled.span<{ isSelected: boolean }>`
  color: ${(props) => (props.isSelected ? "inherit" : color.blue[100])};
`;

// const ArrowIcon = styled.Chevron<{ isOpen: boolean }>`
//   transform: ${(props) => (props.isOpen ? "rotate(180deg)" : "rotate(0)")};
//   transition: transform 0.2s ease;
// `;

// Hook Interface
interface UseDropdownProps {
  disabled: boolean;
  options: string[];
  onChange?: (filter: Filter) => void;
  placeholder?: string;
}

// Custom Hook
export const useDropdown = ({
  options,
  placeholder = "pick item",
  disabled = true,
}: UseDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");

  const selectedOption = options.find((o: string) => o === value);

  const handleSelect = (option: string) => {
    setValue(option);
    // onChange(option);
    setIsOpen(false);
  };

  // Render function
  const renderDropdown = () => (
    <DropdownContainer>
      <DropdownButton disabled={disabled} onClick={() => setIsOpen(!isOpen)}>
        <PlaceholderText isSelected={!!selectedOption}>
          {selectedOption || placeholder}
        </PlaceholderText>
        <Chevron direction={isOpen ? "up" : "down"}></Chevron>
      </DropdownButton>

      {isOpen && (
        <DropdownList>
          {options.map((option: string) => (
            <DropdownItem key={option} onClick={() => handleSelect(option)}>
              {option}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );

  return {
    isOpen,
    value,
    selectedOption,
    renderDropdown,
  };
};

// Usage Example:
/*
import { useDropdown } from './useDropdown';

const YourComponent = () => {
  const options = ["Option 1", "Option 2", "Option 3"];
  
  const { renderDropdown } = useDropdown({
    options,
    onChange: (selectedValue) => console.log(selectedValue),
    placeholder: "Select an option"
  });

  return (
    <div>
      {renderDropdown()}
    </div>
  );
};
*/
