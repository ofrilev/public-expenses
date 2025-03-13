import { useCheckBox } from "../../../../../consts/components/useCheckBox";
import { IconWrapper, FilterItem, InputWrapper } from "./StyledComponents";
import { Filter } from "./types";
import { useDropdown } from "./useDropDown";
import { color } from "../../../../../consts/colors";

export const RenderFilterItem = (props: { filter: Filter }) => {
  const { filter } = props;
  const { checked, toggleCheckBox, CheckBox } = useCheckBox({
    fillColor: color.blue[400],
  });
  const { renderDropdown } = useDropdown({
    options: filter.conditions,
    disabled: !checked,
  });
  return (
    <FilterItem key={filter.key}>
      <IconWrapper onClick={() => toggleCheckBox()}>
        <CheckBox />
        {filter.key}
      </IconWrapper>
      <InputWrapper disabled={!checked}>
        {renderDropdown()}
        <input type=""></input>
      </InputWrapper>
    </FilterItem>
  );
};
