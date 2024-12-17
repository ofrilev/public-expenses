import { ItemsHierarchy } from "../../../global/globalStates/CategoriesContext";
import { CategoriesObj } from "../../../models/models";

export const getCategoriesHierarchy = (categoriesObjArr: CategoriesObj[]) => {
    const itemsHierarchy: ItemsHierarchy = {};
    categoriesObjArr.map((item) => {
      if (item.parent == null) {
        itemsHierarchy[item.id] = {
          name: item.category,
          children: [],
        };
      } else {
        itemsHierarchy[item.parent].children.push({
          id: item.id,
          name: item.category,
        });
      }
    });
    return itemsHierarchy;
  };