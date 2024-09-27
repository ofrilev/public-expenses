import  {useState} from 'react';
import styled from 'styled-components';

const ModalButton = styled.button`
  background-color: #AEC7E0;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #6F93B7;
  }
`

// Styled Components for the popup
const PopupContainer = styled.div<{isModalOpen: boolean}>`
  position: relative;
  display: inline-block;
  visibility: ${props => props.isModalOpen ? 'hidden': 'visible'};
  cursor: pointer;
`;


const PopupContent = styled.div<{ isActive: boolean }>`
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  background-color: #D6E4F2;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  opacity: ${({isActive}) => (isActive ? '1' : '0')};
  --visibility: ${props => props.isActive ? 'visible' : 'hidden'};
  transition: opacity 0.3s, visibility 0.3s;
`;


PopupContent.defaultProps = {
    // @ts-ignore
    isActive: false
}

// const PopupTitle = styled.h3`
//   font-size: 24px;
//   margin-bottom: 10px;
// `;

const PopupMessage = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
`;

// const CloseButton = styled.button`
//   background-color: #ccc;
//   color: white;
//   padding: 8px 16px;
//   border-radius: 4px;
//   border: none;
//   //font-size: 16px;
//   cursor: pointer;
// `;


// Popup component
// @ts-ignore
const Popup = ({title, onClick, isModalOpen}) => {
    const [isActive, setIsActive] = useState(false);

    const handleMouseEnter = () => {
        setIsActive(true)
    };

    const handleMouseLeave = () => {
        setIsActive(false);
    };

    return (
        (<PopupContainer onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={onClick} isModalOpen={isModalOpen} >
            <ModalButton>Hover over me</ModalButton>
            <PopupContent isActive={isActive}>
                <PopupMessage>{title}</PopupMessage>
            </PopupContent>
        </PopupContainer>)
    );
};

export default Popup;
