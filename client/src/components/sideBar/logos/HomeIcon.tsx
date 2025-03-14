import styled from "styled-components";
import { LogosInterface } from "./logosInterface";

const StyledSVG = styled.svg<LogosInterface>`
  width: ${({ width }) => width || "24px"};
  height: ${({ height }) => height || "24px"};

  path {
    fill: ${({ color }) => color || "#B0BAC8"};
  }
`;

const HomeIcon: React.FC<LogosInterface> = (props) => {
  return (
    //@ts-ignore
    <StyledSVG
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M9.13478 21.2733V18.2156C9.13478 17.4351 9.77217 16.8023 10.5584 16.8023H13.4326C13.8102 16.8023 14.1723 16.9512 14.4393 17.2163C14.7063 17.4813 14.8563 17.8408 14.8563 18.2156V21.2733C14.8539 21.5978 14.9821 21.9099 15.2124 22.1402C15.4427 22.3705 15.7561 22.5 16.0829 22.5H18.0438C18.9596 22.5023 19.8388 22.1428 20.4872 21.5008C21.1356 20.8588 21.5 19.987 21.5 19.0778V10.3669C21.5 9.63246 21.1721 8.93584 20.6046 8.46467L13.934 3.17587C12.7737 2.24856 11.1111 2.2785 9.98539 3.24698L3.46701 8.46467C2.87274 8.92195 2.51755 9.62064 2.5 10.3669V19.0689C2.5 20.9639 4.04738 22.5 5.95617 22.5H7.87229C8.55123 22.5 9.103 21.9562 9.10792 21.2822L9.13478 21.2733Z" />
    </StyledSVG>
  );
};

export default HomeIcon;
