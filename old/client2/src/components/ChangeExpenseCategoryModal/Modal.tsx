import { FC, ReactNode } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { color } from "../../consts/colors";
import { JSX } from "react/jsx-runtime";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 1, 0.6);
  backdrop-filter: blur(5px);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Neucha";
`;

const ModalContent = styled.div<{ contentWrapperHeight: number }>`
  background-color: #e6e9ec;
  border-radius: 8px;
  padding: 20px;
  max-width: 2875px;
  width: 90%;
  text-align: center;
  height: ${(props) =>
    props.contentWrapperHeight ? `${props.contentWrapperHeight}%` : "auto"};

  button {
    font-size: 16px;
    border-radius: 10px;
  }
`;

export const DefaultCloseButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 15px;

  button {
    cursor: pointer;
    padding: 11px;
    background-color: ${color.midnight["400"]};
    color: #d6e4f2;

    &:hover {
      background-color: #6f7eab;
    }
  }
`;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  closeButtonWrapper?: React.ComponentType<{ children: ReactNode }>;
  //should be given in percent
  contentWrapperHeight: number;
  children?: JSX.Element;
}

export const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  //@ts-ignore
  closeButtonWrapper = DefaultCloseButtonWrapper,
  contentWrapperHeight,
  children,
}) => {
  if (!isOpen) return null;
  return createPortal(
    <ModalOverlay onClick={(e) => e.stopPropagation()}>
      <ModalContent contentWrapperHeight={contentWrapperHeight}>
        {children}
        <DefaultCloseButtonWrapper>
          <button onClick={() => onClose()}> close</button>
        </DefaultCloseButtonWrapper>
      </ModalContent>
    </ModalOverlay>,
    document.getElementById("portal") as HTMLElement
  );
};
