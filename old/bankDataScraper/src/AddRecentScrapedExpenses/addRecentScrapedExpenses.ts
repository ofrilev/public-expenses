import {SharedUtils} from "shared-utils/dist";
const {excelUtils, dbUtils} = SharedUtils
const { readExcelFile, excelFileScarpingUtils} = excelUtils
import { isFstFileDateGreaterThenSnd} from "./utils";

const path = require('path')
const fs = require('fs');
const newScrapedFilePath = '/Users/ofri.levkowitz/expenses/bankDataScraper/src/recentScarpedExpenses/newScrapedFile';
const recentScarpedExpensesPath = '/Users/ofri.levkowitz/expenses/bankDataScraper/src/recentScarpedExpenses';

export const addNewScrapedExpenses = async () => {
    const newScrapedFile = fs.readdirSync(newScrapedFilePath)[0];
    if (newScrapedFile !== undefined) {
        const lastUpdatedFileExpense = await dbUtils.getLastUpdatedFileExpense();
        if (isFstFileDateGreaterThenSnd(newScrapedFile, lastUpdatedFileExpense.date)) {
            // @ts-ignore
            const formattedNewScrapedExcelObj = {
                name: newScrapedFile,
                data: await excelFileScarpingUtils.TransactionUtils.getMonthExpansesObjMax(readExcelFile(`${newScrapedFilePath}/${newScrapedFile}`))
            };
            lastUpdatedFileExpense.date = lastUpdatedFileExpense.date.replace(/-/g, "/");
            let index = 0;
            const formattedArr = Object.values(formattedNewScrapedExcelObj.data)
            for (let i = 0 ; i < formattedArr.length; i++ ) {
                if (formattedArr[i].date === lastUpdatedFileExpense.date) {
                    if (formattedArr[i].name === lastUpdatedFileExpense.business_name) {
                        index = i + 1;
                        break;
                    }
                }
            }

           const newScrapedDataToUpdate =  formattedArr.slice(index).map((expense) => {
                expense.date = expense.date.replace(/\//g, '-')
                return expense
            })

            dbUtils.updateExpenses(newScrapedDataToUpdate);
            console.log('update db with new expenses complete')

            //remove recent files
            const recentFileWithRecentPath = fs.readdirSync(recentScarpedExpensesPath, {recursive: false}).filter((file: string) => file.includes('.xlsx')).map((file: string) => {
                return path.join(recentScarpedExpensesPath, file)
            })
            for (let i of recentFileWithRecentPath) {
                fs.unlinkSync(i,
                    (err: string) => {
                        if (err) throw err
                        return;
                    });
                console.log(`remove file- ${i} from recentScrapedExpenses directory`)
            }

            fs.rename(`${newScrapedFilePath}/${newScrapedFile}`, `${recentScarpedExpensesPath}/${newScrapedFile}`, (err: Error) => {
                if (err) throw (err)
                console.log('move new transaction file to recent complete!')
                return;
            });

        }
    }
}
