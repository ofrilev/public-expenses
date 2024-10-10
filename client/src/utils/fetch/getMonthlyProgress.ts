import { getTodayDate } from "../../global/date/dateToday";
import { fetchData } from "../useFetch";
import {
  CategoriesBreakDown,
  FetchedMonthlyProgressObject,
  MonthlyProgres,
  ProgressBreakDown,
  SubcategoriesBreakDown,
} from "../../models/fetch/monthlyProgress";

import { CategoriesObj } from "../../models/models";
import { addMonths, format, formatDate } from "date-fns";

export const getMonthlyProgress = async (
  categories: CategoriesObj[]
): Promise<MonthlyProgres[]> => {
  let mp: MonthlyProgres[] = [];

  const thisDate = formatDate(getTodayDate(), "yyyy/MM/01");
  let currentMonth = thisDate;
  for (let i = 0; i < 6; i++) {
    mp.push({
      categoryBreakDown: [],
      month: currentMonth,
      goal_amount: 0,
      currentAmount: 0,
    });
    currentMonth = format(addMonths(currentMonth, 1), "yyyy/MM/01");
  }
  const sixMonthsFuture = formatDate(addMonths(thisDate, 6), "yyyy/MM/01");
  const res = await fetchData<FetchedMonthlyProgressObject>(
    `/monthly-progress?date[gte]=${thisDate}&date[lte]=${sixMonthsFuture}&limit=100`
  );
  const subcategories = categories.filter((c) => c.parent != null);
  const subcategoriesGlobalMap = new Map(subcategories.map((c) => [c.id, c]));
  const buildSubcategoriesBreakDown = (
    progresses: ProgressBreakDown[]
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
  const buildCategoriesBreakDown = (
    subcategoriesBreakDown: SubcategoriesBreakDown[]
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
  mp.map((p, index) => {
    let reformatedMonth = p.month.replaceAll("/", "-");
    const progress = res.monthly_progress[reformatedMonth] ?? [];
    const subcategoriesBreakDown = buildSubcategoriesBreakDown(progress);
    const categoriesBreakDown = buildCategoriesBreakDown(
      subcategoriesBreakDown
    );
    mp[index] = {
      categoryBreakDown: categoriesBreakDown,
      month: p.month,
      goal_amount: categoriesBreakDown.reduce((a, c) => a + c.goal_amount, 0),
      currentAmount: categoriesBreakDown.reduce(
        (a, c) => a + c.currentAmount,
        0
      ),
    };
  });
  return mp;
};
