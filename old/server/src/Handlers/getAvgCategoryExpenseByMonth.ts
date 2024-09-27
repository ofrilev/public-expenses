import { SharedUtils } from "shared-utils";
const { dbUtils, dataFormatter } = SharedUtils;
import { Response } from "./Common";
import { getDateOfRecentMonths, changeToYearMonth } from "./Common";

export const getAvgCategoryExpenseByMonth = async (
  req: any
): Promise<number> => {
  const { ratio, category } = req.body;
  const monthArray = getDateOfRecentMonths(ratio)
    .slice(1)
    .map((date) => changeToYearMonth(date.replace("/", "-")));

  try {
    const promises = monthArray.map(async (date) =>
      dbUtils.getClientQuery(
        `SELECT SUM(amount) AS total FROM expenses WHERE date :: text LIKE '%${date}%' AND category = (SELECT id FROM categories WHERE category = '${category}' LIMIT 1)`
      )
    );

    const results = await Promise.all(promises);
    const totalAmount = results.reduce(
      (sum, result) => sum + (Number(result?.[0]?.total) || 0),
      0
    );
    return Math.round(totalAmount / ratio);
  } catch (error) {
    console.error("Error fetching catgory month avg expenses:", error);
    throw error; // or handle the error as needed
  }
};
