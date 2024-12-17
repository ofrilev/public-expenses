import styled from 'styled-components';

interface ThreeDotsProps extends React.SVGProps<SVGSVGElement> {
    color?: string;
    width?: string;
    height?: string;
}

const StyledSVG = styled.svg<ThreeDotsProps>`
    width: ${({ width }) => width || '25px'};
    height: ${({ height }) => height || '30px'};
  
    path {
        fill: ${({ color }) => color || '#B0BAC8'};
    }
`;

const ThreeDotsIcon: React.FC<ThreeDotsProps> = (props) => {
    return (
        // @ts-ignore
        <StyledSVG viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M12 16c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0-6c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0-6c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" fill="#B0BAC8" fillRule="nonzero"/>
        </StyledSVG>
    );
}

export default ThreeDotsIcon;
