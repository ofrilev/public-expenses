import { useRef, useState } from "react";
import {
  ProgressBarWarpper,
  ProgressBarContainer,
  ProgressBarElement,
  ProgressBarFill,
  ProgressValue,
  TooltipContent,
  TooltipWrapper,
} from "./StyledComponents";
import { DataTable } from "./BreakDownTable";

export const ProgressBar = ({
  breakDownData,
  breakDownPosition,
  calculatePosition,
  value,
  totalValue,
}: {
  breakDownData: {
    business_name: string;
    amount: number;
    date: string;
  }[];
  breakDownPosition: boolean;
  calculatePosition: { top: number; bottom: number };
  value: number;
  totalValue: number;
}) => {
  const [isBreakDownTableVisible, setBreakDownVisible] = useState(false);
  const targetElement = useRef(null);
  const scrollingTop = () => {
    if (targetElement && targetElement.current) {
      // First, scroll the element into view
      //@ts-ignore
      targetElement.current.scrollIntoView({
        behavior: "smooth",
        block: "start", // Align to the top
      });

      // Wait for the next frame to adjust the scroll with an offset
    }
  };
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const handleProgressBarClick = () => {
    if (breakDownData) {
      setBreakDownVisible(!isBreakDownTableVisible);
      scrollingTop();
    }
  };

  const handleMouseMove = (e: any) => {
    setPosition({
      x: e.clientX,
      y: e.clientY,
    });
  };
  return (
    <ProgressBarWarpper className="ProgressBarWarpper">
      <ProgressBarContainer className={"ProgressBarContainer"}>
        <ProgressBarElement
          onClick={() => handleProgressBarClick()}
          onMouseMove={(e) => handleMouseMove(e)}
          onMouseOut={() => setPosition({ x: 0, y: 0 })}
        >
          <ProgressBarFill
            className={"fill"}
            value={value}
            totalValue={totalValue}
          />
          <div ref={targetElement}>
            {isBreakDownTableVisible && (
              <DataTable
                data={breakDownData}
                breakDownPosition={breakDownPosition}
              />
            )}
          </div>
        </ProgressBarElement>
        <ProgressValue className="ProgressValue">{totalValue}</ProgressValue>
      </ProgressBarContainer>
      <TooltipWrapper id="444">
        {position.x !== 0 && (
          <TooltipContent
            x={position.x - 410}
            y={position.y - calculatePosition?.bottom - 410}
          >
            {`Current amount: ${value}`}
          </TooltipContent>
        )}
      </TooltipWrapper>
    </ProgressBarWarpper>
  );
};

export default ProgressBar;
