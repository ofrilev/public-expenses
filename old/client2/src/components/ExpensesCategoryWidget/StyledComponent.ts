import styled from "styled-components";
import { Colors } from "../../consts/colors";
import { PieChart } from "recharts";
const color = new Colors();
const carbon = color.carbon["100"];

export const WidgetGrid = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 90px;
`;
export const WidgetWrapper = styled.div`
  display: flex;
  height: fit-content;
  width: fit-content;
`;
export const DropDownContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 30px;
  left: 22px;
`;
export const DropDownContent = styled.div`
  display: none;
  cursor: pointer;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 1;
`;

export const DropDownLabel = styled.div`
  position: relative;
  cursor: pointer;
  border-radius: 4px;
  background: ${carbon};
  div {
    padding: 4px;
    font-weight: 400;
    font-family: "Devanagari MT";
  }
`;

export const DropDown = styled.div`
  height: fit-content;
  position: relative;
  display: inline-block;

  &:hover ${DropDownContent} {
    display: block;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
`;
export const StyledDropDownItems = styled.p`
  cursor: pointer;
  border-radius: 4px;
  height: 29px;
  text-align: center;
  padding: 1px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  &:hover {
    transition-delay: 1s;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.15);
  }
`;
export const DropDownItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 7px;
  align-items: baseline;
`;
//@ts-ignore
export const StyledPieChart = styled(PieChart)`
  .recharts-responsive-container {
    display: flex;
    flex-direction: row;
  }
  .PieChart-Styled {
    position: fixed;
  }

  .recharts-default-legend {
    align-items: start;
    display: flex;
    flex-direction: column;
    width: fit-content;
  }
  .recharts-legend-item-text {
    color: #666666 !important;
  }
`;
