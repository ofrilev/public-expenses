import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ThreeDotsIcon from "../../../../consts/icons/threeDots";
import DeleteIcon from "../../../../consts/icons/delete";
import ChangeIcon from "../../../../consts/icons/change";

const ModalWrapper = styled.div`
  position: absolute;
  z-index: 1000;
  transform: translateX(332px) translateY(85px);
  border: 1px solid;
  width: 143px;
  height: 90px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 30px;
  




  background-color: rgba(0, 0, 1, 0.3);
  backdrop-filter: blur(3px);
  z-index: 1000;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  cursor: pointer;
  &:hover {
    opacity: 0.4;
  }
`;

export const useEdit = () => {
  const mainWrapperDOM = document.getElementById("wrapper");
  const [toggle, setToggle] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const onToggleClick = () => setToggle((prev) => !prev);

  const handleOutsideClick = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      document.body.style.overflow = "hidden";
      setToggle(false);
    } else {
      mainWrapperDOM?.style.setProperty(
        "background-color",
        "rgba(0, 0, 1, 0.3)"
      );
      document.body.style.overflow = "unset";
    }
  };

  useEffect(() => {
    if (toggle) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [toggle]);

  const EditIcon = () => (
    <>
      <ThreeDotsIcon onClick={onToggleClick} />
      {toggle && (
        <ModalWrapper ref={modalRef}>
          <IconWrapper>
            <DeleteIcon />
            Delete
          </IconWrapper>
          <IconWrapper>
            <ChangeIcon />
            Change
          </IconWrapper>
        </ModalWrapper>
      )}
    </>
  );

  return { EditIcon };
};
