import styled from "styled-components";
import { LogosInterface } from "./logosInterface";



const StyledSVG = styled.svg<LogosInterface>`
  width: ${({ width }) => width || "24px"};
  height: ${({ height }) => height || "24px"};

  path {
    fill: ${({ color }) => color || "#B0BAC8"};
  }
`;

const GraphIcon: React.FC<LogosInterface> = (props) => {
  return (
    <StyledSVG
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8.95607 4.9595C9.4462 4.86776 9.93762 5.11248 10.1515 5.55479C10.2047 5.63505 10.2473 5.72164 10.2782 5.81245C10.4141 7.90929 10.559 9.97059 10.6948 12.0319C10.6917 12.2462 10.7254 12.4594 10.7944 12.6627C10.9569 13.0627 11.3614 13.3165 11.7997 13.2936L18.4558 12.8671L18.5011 12.8848L18.6226 12.8936C18.8632 12.9244 19.0875 13.0342 19.2579 13.207C19.4566 13.4087 19.5655 13.6795 19.5608 13.9599C19.2984 17.782 16.4962 20.9755 12.6828 21.7982C8.86938 22.621 4.96017 20.8754 3.08778 17.5139C2.53722 16.5457 2.1893 15.4794 2.06445 14.3775C2.01603 14.051 1.99483 13.7212 2.00106 13.3913C2.01368 9.32706 4.90728 5.81907 8.95607 4.9595ZM12.9135 2.00082C17.4843 2.13765 21.3044 5.4558 21.9967 9.89063C22.0011 9.91711 22.0011 9.94411 21.9967 9.97059L21.9955 10.0958C21.9804 10.2613 21.9125 10.4191 21.7996 10.5458C21.6586 10.7043 21.459 10.801 21.2451 10.8147L13.5656 11.3211L13.4391 11.3236C13.2294 11.3134 13.0284 11.2319 12.8718 11.0909C12.6839 10.9218 12.5774 10.6828 12.5785 10.4326L12.0623 2.88932V2.76493C12.0717 2.55278 12.1667 2.353 12.3264 2.20966C12.4861 2.06632 12.6973 1.99119 12.9135 2.00082Z"
      />
    </StyledSVG>
  );
};

export default GraphIcon;