import { SharedUtils } from "shared-utils";
const { dbUtils, dataFormatter } = SharedUtils;
import { Response } from "./Common";

export const getCategoryMonthlyExpensesBreakDown = async (
  req: any
): Promise<any> => {
  const { date, category } = req.body;
  const dayDate = date.split("-")[0];
  const monthDate = date.split("-")[1];
  const yearDate = date.split("-")[2];
  const yearMonthDate = `${yearDate}-${monthDate}`;
  const res = await dbUtils.getClientQuery(
    `SELECT business_name, amount, TO_CHAR(date, 'DD-MM-YYYY') as date from expenses where category=(SELECT id FROM categories WHERE category = '${category}' ) AND date :: text ~~ '%${yearMonthDate}%' `
  );
  if (res) {
    if (res.length > 0) {
      return res;
    }
    return null;
  }
};
