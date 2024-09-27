import styled from "styled-components";

const StyledWrapper = styled.div`
  cursor: default;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.15);
  font-weight: 600;
  font-size: 17px;
  color: #ffff;
  width: 386px;
  height: 57px;
  padding: 10px;
  border-radius: 100px;
  background: linear-gradient(217.64deg, #fadccd -5.84%, #f4a57d 106.73%);
  opacity: 0px;
`;
export const ToastBarComponent = () => (
  <StyledWrapper>Monthly Progress changed successfully !</StyledWrapper>
);
