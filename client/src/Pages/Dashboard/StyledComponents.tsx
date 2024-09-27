import styled from "styled-components";
import { mediaQuery } from "../../../consts/common/mediaQuery";

export const GridWrapper = styled.div`
  display: flex;
  width: 985px;
  padding-top: 147px;
  padding-left: 10px;
  @media screen and (min-width: ${mediaQuery.isSmallDesktop}) {
    padding-left: 52px;
  }
  @media screen and (min-width: ${mediaQuery.isMeduimDesktop}) {
    width: 100%;
    padding-left: unset;
    justify-content: center;
  }
  justify-items: center;
`;

export const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(20, 50px);
  grid-template-rows: repeat(20, 50px);
`;
export const FirstGridItem = styled.div`
  @media screen and (min-width: ${mediaQuery.isMeduimDesktop}) {
    grid-area: 1/1/7/12;
  }
  grid-area: 1/ 1 / 7 / 9;
`;
export const SecondGridItem = styled.div`
  @media screen and (min-width: ${mediaQuery.isMeduimDesktop}) {
    grid-area: 1/13/7/20;
  }
  grid-area: 8/1/11/9;
  justify-self: center;
`;
export const ThirdGridItem = styled.div`
  @media screen and (max-width: 1229px) {
    grid-area: 14 / 1 / 15 / 10;
    margin-top: 31px;
  }
  @media screen and (min-width: 1230px) {
    grid-area: 8 / 9 / 15 / 18;
    justify-self: center;
  }
  @media screen and (min-width: ${mediaQuery.isMeduimDesktop}) {
    /* grid-area: 8/8/14/14; */
    grid-area: 8 / 1 / 14 / 9;
    align-self: end;
  }
`;
export const ForthGridItem = styled.div`
  @media screen and (max-width: 1229px) {
    grid-area: 21 / 1 / 22 / 10;
    margin-top: 15px;
  }
  @media screen and (min-width: 1230px) {
    grid-area: 15 / 1 / 21 / 20;
    align-self: end;
  }
  @media screen and (min-width: ${mediaQuery.isMeduimDesktop}) {
    grid-area: 8 / 10 / 14 / 20;
    justify-self: center;
  }
`;
export const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 24px;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
`;
/* 
export const StyledRowWrapper = styled.div`
  width: 985px;
  display: flex;
  flex-direction: row;
  gap: 34px;
  align-items: center;
  justify-items: center;
`; */

export class StyledDoughnut {
  public ChartContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center; /* Aligns vertically */
    width: 100%;
    height: 80%;
  `;
  public LegendContainer = styled.div`
    height: 100%;
    margin-bottom: 12px;
    margin-left: 21px;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    align-content: flex-start;
    justify-content: end;
  `;

  public LegendItem = styled.div<{ isSelected: boolean }>`
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    color: #767676;
    white-space: nowrap;
    font-weight: 700;
    font-size: 11px;
  `;

  public LegendColorBox = styled.div`
    width: 15px;
    height: 15px;
    border: 1px;
    border-radius: 30px;
    background-color: ${(props) => props.color};
    margin-right: 5px;
  `;
  public DoughnutContainer = styled.div`
    width: 200px;
    height: 200px;
    display: flex;
    align-self: baseline;
  `;
}
