import { useEffect, FC } from "react";
import styled from "styled-components";

// Styled component for toast bar
const ToastWrapper = styled.div<{ show: boolean }>`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 16px;
  border-radius: 8px;
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: opacity 0.5s ease;
  pointer-events: ${({ show }) => (show ? "auto" : "none")};
  z-index: 1000; /* Ensure it stays on top */
`;

// Toast component with customizable content and styles
interface Props {
  show: boolean;
  duration: number;
  onClose?: () => void;
  renderCustomComponent: () => JSX.Element;
}
export const Toast: FC<Props> = ({
  show,
  duration,
  onClose = () => {},
  renderCustomComponent,
}: Props) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer); // Cleanup on unmount
    }
  }, [show, duration, onClose]);

  return <ToastWrapper show={show}>{renderCustomComponent()}</ToastWrapper>;
};
export const showToast = () => {
  
}