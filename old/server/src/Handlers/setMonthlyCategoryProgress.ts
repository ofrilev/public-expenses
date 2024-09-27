import { SharedUtils } from "shared-utils";
const { dbUtils, dataFormatter } = SharedUtils;
import { Response } from "./Common";

export const setMonthlyCategoryProgress = async (
  req: any
  //@ts-ignore
): Promise<string | Response> => {
  let result = "failed to set monthly progresses";
  const { goalAmount, date, category, option } = req.body;
  if (typeof goalAmount && date && category && option) {
    const yearDate = date.split("/")[1];
    const monthDate = date.split("/")[0];
    const monthYearDate = `${monthDate}-${yearDate}`;
    const yearMonthDate = `${yearDate}-${monthDate}`;
    const SetQueries = {
      create: `INSERT INTO monthly_progress (category, date, amount) values ((SELECT id FROM categories WHERE category = '${category}'), to_date('${monthYearDate}', 'MM-YYYY'), ${goalAmount});`,
      modify: `UPDATE monthly_progress SET amount= '${goalAmount}' where  category =(  SELECT id FROM categories WHERE category = '${category}') AND  date :: text ~~ '%${yearMonthDate}%' `,
      delete: `DELETE FROM monthly_progress where category =(SELECT id FROM categories WHERE category = '${category}') AND   date :: text ~~ '%${yearMonthDate}%'`,
    };
    if (option == "create" || option == "modify" || option == "delete") {
      //@ts-ignore
      const res = await dbUtils.getClientQuery(SetQueries[option]);

      if (res && res.length) {
        return res.length > 0 ? Response.SUCCESS : Response.FAILED;
      }
    }
  }
};
