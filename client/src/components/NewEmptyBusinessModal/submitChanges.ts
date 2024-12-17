import { putReq } from "../../utils/useFetch";
import { triggerFetchUnknownBusinessName } from "../sideBar/UnkownBusinessCategories";
import { ChangedBusiness } from "./NewEmptyBusinessModal";

export const submitChanges = async (changeBusiness: ChangedBusiness, resetChangedBusiness: () => void) => {
  const data = Object.entries(changeBusiness).map(([key, { newCategoryId }]) => ({
    business_name: key,
    category: newCategoryId,
  }));
  try {
    await putReq("expenses/by-business-name", data);
    resetChangedBusiness();
    triggerFetchUnknownBusinessName();
  } catch {
    resetChangedBusiness();
    triggerFetchUnknownBusinessName();
  }
};
