import  {FC, JSX, ReactNode} from 'react';
import styled from 'styled-components';
import {color} from "../colors";

interface TooltipProps {
    icon: ReactNode;       // You can pass in SVG or any JSX component
    textContent?: string;// Text content for the tooltip
    jsxContent?: JSX.Element;
    // ContentComponent?: React.ComponentType<{ children: ReactNode }>; // The styled-component or any React component
    ContentComponent?: any;
    contentId?: string;
    onClick?: any

}

const TooltipWrapper = styled.div<{contentId? : string}>`
  position: relative;
  display: inline-block;
  cursor: pointer;

  &:hover #${props => props.contentId} {
    display: block;

  }
`;
const DefaultWrapper = styled.span`
  display: none;
  position: absolute;
  width: 120px;
  bottom: 100%;
  left: 50%;
  transform: translateX(-110%) translateY(96%);
  margin-bottom: 10px;
  background-color: ${color.midnight["400"]};
  color: ${color.carbon["0"]};
  text-align: center;
  border-radius: 4px;
  padding: 5px;
  z-index: 1;
  ::before {
    content: "";
    top: 50%;
    left: calc(100% - 1px);
    transform: translateY(-50%);
    position: absolute;
    border-top: 10px solid transparent;
    border-right: 0;
    border-bottom: 10px solid transparent;
    border-left: 9px solid ${color.midnight["400"]};
  }

`;


const CustomTooltip: FC<TooltipProps> = ({icon, textContent, ContentComponent = DefaultWrapper, jsxContent, contentId, onClick}) => {
    return (
        <TooltipWrapper className={"tooltipwrapper"}  contentId={contentId} onClick={onClick} >
            {icon}
            <ContentComponent id={contentId}>{textContent}{jsxContent}</ContentComponent>
        </TooltipWrapper>
    );
};

export default CustomTooltip;
