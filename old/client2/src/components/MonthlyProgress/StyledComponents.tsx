import styled from "styled-components";

export const ContentWrapper = styled.div`
  display: flex;
  height: 500px;
  gap: 65px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const ProgressBox = styled.div`
  width: 110%;
  display: flex;
  justify-content: end;
`;

export const ProgressesContainer = styled.div`
  height: 600px;
  overflow-y: auto;
  position: relative;
  max-height: 300px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-self: center;
  align-content: end;
  row-gap: 20px;
  column-gap: 28px;
  width: 95%;

  ::-webkit-scrollbar {
    visibility: hidden;
    background-color: darkgrey;
    outline: 1px slategrey;
    width: 2px;
  }
`;

export const ProgressWarpper = styled.div<{ breakDownPosition: boolean }>`
  justify-content: ${(props) => (props.breakDownPosition ? "end" : "start")};
  display: flex;
  flex-direction: row;
  grid-gap: 20px;
`;
