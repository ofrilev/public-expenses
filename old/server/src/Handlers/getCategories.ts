import { SharedUtils } from "shared-utils";
const { dbUtils, dataFormatter } = SharedUtils;

export const getCategories2 = async () => {
  const returnObj: { id: number; category: string; parent: number }[] = [];
  const res = await dbUtils.getClientQuery(
    "SELECT  id,category,parent from categories"
  );
  if (res && res.length > 0) {
    res.map((item: any) => {
      returnObj.push({
        id: item.id,
        category: item.category,
        parent: item.parent,
      });
    });
    return returnObj;
  }
};
