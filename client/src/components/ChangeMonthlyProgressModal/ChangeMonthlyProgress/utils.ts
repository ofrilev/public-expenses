import { ModalMonthlyProgress } from "../ModalStepController";
import { MonthlyProgress, CategoriesObjArr } from "../../../models/models";

export const getTotalSum = (data: ModalMonthlyProgress[]) => {
  return data
    .filter((item) => item.parentId == null)
    .reduce((totalAmount, item) => totalAmount + item.goal_amount, 0);
};

// Function to update the parent category's amount
export const updateParentAmount = (
  parentId: number,
  newState: ModalMonthlyProgress[],
  handleMonthlyCategoryChange: (newState: ModalMonthlyProgress[]) => void
) => {
  const updatedCategoryData = [...newState];

  let parentCategory = null;
  let parentCategoryIndex = -1;

  // Find the parent category and its index in a single loop
  for (let i = 0; i < updatedCategoryData.length; i++) {
    if (updatedCategoryData[i].id === parentId) {
      parentCategory = updatedCategoryData[i];
      parentCategoryIndex = i;
      break; // Stop the loop once the parent category is found
    }
  }

  if (parentCategory) {
    // Calculate the sum of subcategory amounts
    const parentAmount = updatedCategoryData
      .filter((category) => category.parentId === parentId)
      .reduce((total, subcategory) => total + subcategory.goal_amount, 0);

    // Update the parent category's amount
    updatedCategoryData[parentCategoryIndex].goal_amount = parentAmount;

    // Update the state with the modified data
    handleMonthlyCategoryChange(updatedCategoryData);
  }
};

export const getFirstState = (
  monthlyCategoryProgress: MonthlyProgress[],
  categoriesObjArr: CategoriesObjArr
) => {
  const findCategoryGoalAmountByName = (category: string) => {
    const item = monthlyCategoryProgress?.find(
      (data) => data.category == category
    );
    return item ? item.goal_amount : 0;
  };
  const result: ModalMonthlyProgress[] = [];
  categoriesObjArr.map((item) => {
    result.push({
      category: item.name,
      id: item.id,
      parentId: item.parent,
      goal_amount: findCategoryGoalAmountByName(item.name),
    });
  });
  result.map((item) => {
    if (item.parentId !== null) {
      result[result.findIndex((it) => it.id === item.parentId)].goal_amount +=
        item.goal_amount;
    }
  });
  return result;
};

/**
 * Converts a date string in the format "YYYY-MM" to a Date object.
 * @param {string} s - The date string to convert of form YYY-MM.
 * @returns {Date} A new Date object set to the first day of the given month and year.
 * @throws {Error} Throws an error if the date format is invalid or the date values are not numbers.
 */
export const getDateFromString = (s: string): Date => {
  const parts = s.split("-");
  if (parts.length !== 2) {
    throw new Error("Invalid date format");
  }

  const month = parseInt(parts[1], 10) - 1; // Subtract 1 because months are 0-indexed
  const year = parseInt(parts[0], 10);
  if (isNaN(month) || isNaN(year)) {
    throw new Error("Invalid date values");
  }

  return new Date(year, month);
};
/**
 * Converts a date Date in the format of a Date object tos tring  "YYYY-MM" .

* @param {Date} d new Date object set to the first day of the given month and year. 
 * @returns {string} s - The date string to convert of form YYY-MM. 
 */
export const getStringFromDate = (d: Date): string => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  return year + "-" + month;
};
