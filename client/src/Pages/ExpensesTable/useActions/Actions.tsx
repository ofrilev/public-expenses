
import { useFilters } from "./Filters/useFilters";

export const Actions = () => {
  const { Filters } = useFilters();
  return <>{Filters()}</>;
};
