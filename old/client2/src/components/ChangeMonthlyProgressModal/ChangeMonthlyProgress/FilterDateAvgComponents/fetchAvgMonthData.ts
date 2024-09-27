import { fetchData } from "../../../../utils/useFetch";
import { CategoriesObjArr } from "../../../../models/models";

export type AvgRatioMonthData = {
  id: number;
  parent: number | null;
  category: string;
  Avg3: number;
  Avg4: number;
  Avg6: number;
  Avg12: number;
};

export const fetchAvgRatioMonthData = async (
  categoriesObjArr: CategoriesObjArr
): Promise<AvgRatioMonthData[]> => {
  const fetchSubCategoryAvgMonthData = async (subCategory: {
    categoryId: number;
    category: string;
    parentId: number;
  }): Promise<AvgRatioMonthData> =>
    await fetchData<AvgRatioMonthData>(
      `/avg/category/expenses/by-ratio?categoryId=${subCategory.categoryId}&category=${subCategory.category}&parentId=${subCategory.parentId}`
    );

  const promises = categoriesObjArr.Categories.map((item) =>
    item.parent != null
      ? fetchSubCategoryAvgMonthData({
          categoryId: item.id,
          category: item.name,
          parentId: item.parent,
        })
      : undefined
  );

  const res = await Promise.all(promises);

  const subCategoriesResArr = res.filter((item) => item) as AvgRatioMonthData[];

  const getChildrenFromId = (
    id: number,
    arr: AvgRatioMonthData[]
  ): AvgRatioMonthData[] => arr.filter((item) => item.parent === id);

  if (subCategoriesResArr) {
    const categories = categoriesObjArr.Categories.filter(
      (item) => item.parent == null
    );
    let categoriesResArr: AvgRatioMonthData[] = [];

    categories.forEach((category) => {
      const childrenSubCategories = getChildrenFromId(
        category.id,
        subCategoriesResArr
      );
      const avgData: AvgRatioMonthData = {
        id: category.id,
        parent: null,
        category: category.name,
        Avg3: childrenSubCategories.reduce(
          (avg3Sum, item) => avg3Sum + item.Avg3,
          0
        ),
        Avg4: childrenSubCategories.reduce(
          (avg4Sum, item) => avg4Sum + item.Avg4,
          0
        ),
        Avg6: childrenSubCategories.reduce(
          (avg6Sum, item) => avg6Sum + item.Avg6,
          0
        ),
        Avg12: childrenSubCategories.reduce(
          (avg12Sum, item) => avg12Sum + item.Avg12,
          0
        ),
      };
      categoriesResArr.push(avgData);
    });

    return [...categoriesResArr, ...subCategoriesResArr];
  }
  return [];
};
