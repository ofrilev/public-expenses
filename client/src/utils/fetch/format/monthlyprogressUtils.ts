import { CategoriesBreakDown, ProgressBreakDown, SubcategoriesBreakDown } from "../../../models/fetch/monthlyProgress";
import { CategoriesObj } from "../../../models/models";


export const buildSubcategoriesBreakDown = (
    progresses: ProgressBreakDown[],
    subcategoriesGlobalMap: Map<number, CategoriesObj>
  ): SubcategoriesBreakDown[] => {
    let subcategoriesBreakDown: SubcategoriesBreakDown[] = [];
    let thisSubcategoriesMap = new Map<number, CategoriesObj>(
      JSON.parse(JSON.stringify([...subcategoriesGlobalMap]))
    );

    for (const p of progresses) {
      const pCategoryId = Number(p.category);
      let c = thisSubcategoriesMap.get(pCategoryId);
      if (c) {
        subcategoriesBreakDown.push({
          subcategory: c.category,
          categoryId: c.id,
          id: p.id,
          goal_amount: p?.goal_amount,
          currentAmount: p.currentAmount,
        });
        thisSubcategoriesMap.delete(pCategoryId);
      } else {
        console.error(
          `no progress-category-id found in categories. category-d:${p.category}`
        );
      }
    }
    //If no progress for subcategory. a new object is created

    for (const c of thisSubcategoriesMap.values()) {
      subcategoriesBreakDown.push({
        subcategory: c.category,
        categoryId: c.id,
        id: -1,
        goal_amount: 0,
        currentAmount: 0,
      });
    }

    return subcategoriesBreakDown;
  };
  export const buildCategoriesBreakDown = (
    subcategoriesBreakDown: SubcategoriesBreakDown[],
    categories:CategoriesObj[] 
  ) => {
    let categoriesBreakDown: CategoriesBreakDown[] = [];
    const parentCategories = categories.filter((c) => c.parent == null);
    parentCategories.map((c) => {
      categoriesBreakDown.push({
        category: c.category,
        goal_amount: 0,
        currentAmount: 0,
        subcategoriesBreakDown: [],
      });
    });
    subcategoriesBreakDown.map((sb) => {
      const parentCategoryId = categories.find(
        (c) => c.category == sb.subcategory
      )?.parent;
      const parentCategoryName = categories.find(
        (c) => c.id == parentCategoryId
      )?.category;
      const index = categoriesBreakDown.findIndex(
        (cb) => cb.category == parentCategoryName
      );
      categoriesBreakDown[index].goal_amount += sb.goal_amount;
      categoriesBreakDown[index].currentAmount += sb.currentAmount;
      categoriesBreakDown[index].subcategoriesBreakDown.push(sb);
    });
    return categoriesBreakDown;
  };