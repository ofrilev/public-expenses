import { putReq } from "../../utils/useFetch";
import { triggerFetchUnknownBusinessName } from "../sideBar/UnkownBusinessCategories";
import { ChangedBusiness } from "./NewEmptyBusinessModal";

export const submitChanges = async (changeBusiness: ChangedBusiness) => {
  let data = Object.entries(changeBusiness).map(([key, value]) => {
    return {
      business_name: key,
      category: value.newCategoryId,
    };
  });
  const res = await putReq("expenses/by-business-name", data);
  if (res.status) {
    triggerFetchUnknownBusinessName();
  }
};
