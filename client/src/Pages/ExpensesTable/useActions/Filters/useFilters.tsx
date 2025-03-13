import { useState } from "react";
import {
  DoneButton,
  FiltersWrapper,
  LineBreak,
  ModalWrapper,
  UpperSection,
  UpperSectionContent,
} from "./StyledComponents";
import { Filter, initialFilters } from "./types";
import { CancelIcon } from "../../../../components/sideBar/logos/CancelIcon";
import { RenderFilterItem } from "./FilterItems";

export const useFilters = () => {
  const [toggle, setToggle] = useState(false);

  const [filters, setFilters] = useState<Filter[]>(initialFilters);
  const [tempFilters] = useState<Filter[]>(initialFilters);
  const updateFilter = () => setFilters(tempFilters);
  const Filters = () => {
    return (
      <>
        <button onClick={() => setToggle(true)}>Filters</button>
        {toggle && (
          <ModalWrapper>
            <UpperSection>
              <UpperSectionContent>
                <CancelIcon onClick={() => setToggle(false)} />
                <div>Filter</div>
                <DoneButton
                  onClick={() => {
                    updateFilter();
                    setToggle(false);
                  }}
                >
                  Done
                </DoneButton>
              </UpperSectionContent>
              <LineBreak />
            </UpperSection>
            <FiltersWrapper>
              {filters.map((filter) => (
                <RenderFilterItem filter={filter} />
              ))}
            </FiltersWrapper>
          </ModalWrapper>
        )}
      </>
    );
  };
  return { Filters };
};
