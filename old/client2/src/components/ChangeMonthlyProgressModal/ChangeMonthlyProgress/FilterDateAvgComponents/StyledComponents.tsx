import styled from "styled-components";
import { color } from "../../../../consts/colors";

export const FilterChoserWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
export const FilterChangeTitle = styled.div`
  font-size: large;
  font-weight: 300;
`;
export const FilterContainer = styled.div`
  background-color: ${color.red[200]};
  opacity: 0.89;
  border: solid salmon;
  border-width: 10px 2px 2px 1px;
  border-radius: 8px 8px 12px 12px;
`;
