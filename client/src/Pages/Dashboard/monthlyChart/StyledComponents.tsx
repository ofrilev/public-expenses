import styled from "styled-components";

export const StyledTooltip = styled.div<{ x: number; y: number }>`
  position: absolute;
  background: #fff0e9;
  min-width: 26px;
  min-height: 20px;
  display: flex;
  justify-content: center;
  top: ${({ y }) => y}px; // y;
  left: ${({ x }) => x}px;
  color: #f07d42;
  font-weight: 400px;
  font-size: 12px;
  padding: 4px;
  border-radius: 4px;
  font-size: 12px;
  z-index: 500;
  font-weight: 400;
  font-size: 12px;
`;
