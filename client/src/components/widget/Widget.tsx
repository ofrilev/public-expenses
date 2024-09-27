import styled from "styled-components";

const StyledWidget = styled.div<{ width: number; height: number }>`
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.height}px`};
  /* padding: 21px 49.52px 17.84px 51px; */
  border: 1px solid #e7e7e7;
  border-radius: 20px;
`;
const StyledTitle = styled.div`
  padding-top: 25px;
  padding-left: 21px;
  font-size: 24px;
  line-height: 39.89px;
  color: #6d6d6d;
`;
interface WidgetPrpos {
  height?: number;
  width?: number;
  title: string;
  children?: JSX.Element;
}
export const Widget = ({
  height = 314,
  width = 541,
  title,
  children,
}: WidgetPrpos) => {
  return (
    <StyledWidget height={height} width={width}>
      <StyledTitle>{title}</StyledTitle>
      {children}
    </StyledWidget>
  );
};
