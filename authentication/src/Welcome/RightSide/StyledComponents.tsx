import styled from "styled-components";

export const FrameWrapper = styled.div`
  width: 60%;
  background-color: white;
`;
export const MainWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
export const StyledTitle = styled.div`
  background: linear-gradient(#fadccd, #f4a57d);
  white-space: nowrap;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  font-size: 48px;
  font-weight: 800;
  line-height: 79.78px;
`;
export const StyledSubtitle = styled.div`
  color: black;
  font-size: 20px;
  font-weight: 500;
  line-height: 33.24px;
  width: 309px;
  white-space: nowrap;
`;

export const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: white;
  & > div {
    color: black;
    display: block;
    height: 33px;
    font-size: 20px;
    font-weight: 600;
    line-height: 33.24px;
    text-align: left;
  }
  & > input {
    background-color: white;
    color: black;
    width: 382px;
    height: 22px;
    padding: 14px;
    border-radius: 100px;
    border: 1px solid lightgray;
  }
`;
export const StyledSubmitButton = styled.button<{ loading: boolean }>`
  background: linear-gradient(#fadccd, #f4a57d);
  cursor: ${(props) => (props.loading ? "none" : "pointer")};
  height: 60px;
  width: 393px;
  color: white;
  text-align: center;
  line-height: 33.24px;
  font-size: 20px;
  font-weight: 600;
  border-radius: 100px;
  &:hover {
    opacity: ${(props) => (props.loading ? "0.6" : "unset")};
  }
`;
