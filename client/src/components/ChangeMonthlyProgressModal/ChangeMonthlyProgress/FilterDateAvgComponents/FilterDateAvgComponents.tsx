import { useState } from "react";
import { FilterChangeTitle, FilterChoserWrapper } from "./StyledComponents";

export const useFilteredcategoryData = () => {
  const [filtered, setFiltered] = useState<boolean>(false);
  const [filterRatio, setFilterRatio] = useState<number>(3);
  const selectFilterCheckBox = () => {
    return (
      <div>
        <input
          type="checkbox"
          onChange={() =>
            setFiltered((prevFilter) => {
              console.log(`change filter to ${!prevFilter} `);
              return !prevFilter;
            })
          }
        />
      </div>
    );
  };
  const chooseFilterRatio = () => {
    const handleSelectChange = (e: string) => {
      setFilterRatio(Number(e));
    };
    return (
      <div>
        <select
          value={filterRatio}
          onChange={(e) => handleSelectChange(e.target.value)}
        >
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="6">6</option>
          <option value="12">12</option>
        </select>
      </div>
    );
  };

  const FilterChoser = () => (
    <FilterChoserWrapper className="FilterChoserWrapper">
      <FilterChangeTitle>choose month ratio for statistics</FilterChangeTitle>
      {selectFilterCheckBox()}
      {chooseFilterRatio()}
    </FilterChoserWrapper>
  );

  return { FilterChoser, filtered, filterRatio };
};
