import {
  MainWrapper,
  StyledTitle,
  StyledSubtitle,
  StyledInputWrapper,
  FrameWrapper,
  StyledSubmitButton,
} from "./StyledComponents";
import { Page } from "../Auth";
import { loginTheme, registrationTheme } from "./theme";
import { useRef, useState } from "react";
import LoaderGif from "../../consts/svgs/LoaderGif";
const PageTheme = [registrationTheme, loginTheme];

export const RightSide = (props: { page: Page }) => {
  const [loading, setLoading] = useState(false);
  const userNameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const chosenPage = PageTheme[props.page];

  return (
    <FrameWrapper>
      <MainWrapper>
        <StyledTitle>{chosenPage.title}</StyledTitle>
        <StyledSubtitle>{chosenPage.subTitleText}</StyledSubtitle>
        <StyledInputWrapper>
          <div>Email</div>
          <input
            placeholder="Enter your email "
            type="text"
            ref={userNameRef}
          />
        </StyledInputWrapper>
        <StyledInputWrapper>
          <div>{chosenPage.inputText}</div>
          <input
            placeholder={chosenPage.inputPlaceHolder}
            type="password"
            ref={passwordRef}
          />
        </StyledInputWrapper>
        <StyledSubmitButton
          loading={loading}
          className="SubmitButton"
          onClick={() =>
            chosenPage.handleSubmit({
              userName: userNameRef?.current?.value ?? "",
              password: passwordRef?.current?.value ?? " ",
              setLoading: setLoading,
            })
          }
        >
          {loading ? <LoaderGif /> : chosenPage.buttonText}
        </StyledSubmitButton>
      </MainWrapper>
    </FrameWrapper>
  );
};
