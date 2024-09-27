import {SharedUtils} from "shared-utils";

const {dbUtils, dataFormatter} = SharedUtils

export type MonthlyProgress = {
    category: string;
    date: string;
    goal_amount: number;
    currentAmount: number;
}

export const getMonthlyCategoryProgress = async(req:any): Promise<MonthlyProgress[] | string > => {
    const date = req.query?.date?.toString();
    let result = "failed to get monthly progresses";
    if(date){
        const yearDate = date.split('/')[1];
        const monthDate = date.split('/')[0];
        const yearMonthDate = `${yearDate}-${monthDate}`;
        let res = await dbUtils.getClientQuery(`SELECT 
        mp.amount as goal_Amount, 
        TO_CHAR(mp.date, 'DD-MM-YYYY') as date,
        result,
        (
          SELECT c.category
          FROM categories c
          WHERE c.id = mp.category
        ) AS category
      FROM 
        monthly_progress mp
      WHERE 
        mp.date::text LIKE '%${yearMonthDate}%'; 
      `)
         if(res && res.length > 1) {
            //todo: add here the logic of  checking the table result entry fpr passed month progresses
            const progressPromises =  res.map(async (progress: MonthlyProgress) => {
                let currentAmmount;
                const res =  await dbUtils.getClientQuery(`SELECT SUM (amount) as currentAmount FROM expenses where date :: text ~~ '%${yearMonthDate}%' AND category= (SELECT id FROM categories WHERE category = '${progress.category}')`)
                if (res && res.length > 0) {
                    currentAmmount =  Number(res[0]?.currentamount)
                }
                progress["currentAmount"] = typeof currentAmmount == "number" ? currentAmmount : 0;
            })
            await Promise.all(progressPromises)
            return res
        }
        return res;
    }
    return result;

}
