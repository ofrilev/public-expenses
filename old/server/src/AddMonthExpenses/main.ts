import {SharedUtils} from "shared-utils";

import {FilePaths} from "../expensess-files-discont/fileExporter";
const filePath = "/Users/ofri.levkowitz/Desktop/expensess-project/server/src/AddMonthExpenses/Export_6_2023.xls";

export const main = () => {
    const extractedFiles = FilePaths.map((file) => SharedUtils.excelUtils.readExcelFile(file))
    // const extractFile = SharedUtils.excelUtils.readExcelFile(filePath);
    // extractedFiles.map((file) => TransactionUtils.handleNewTransactions(file as unknown as string[], 'discont'))
    // SharedUtils.excelUtils.excelFileScarpingUtils.TransactionUtils.getMonthExpansesObjAbstract(extractFile)
    const maxFile1 = SharedUtils.excelUtils.readExcelFile('/Users/ofri.levkowitz/expenses/bankDataScraper/src/recentScarpedExpenses/newScrapedFile/transaction-details_export_1699442572798.xlsx');
    const maxFile2 = SharedUtils.excelUtils.readExcelFile('/Users/ofri.levkowitz/expensess-project/server/src/expenses-files-max/02.06.23.xlsx');

    SharedUtils.excelUtils.excelFileScarpingUtils.TransactionUtils.handleNewTransactions( maxFile1, 'max')
    // SharedUtils.excelUtils.excelFileScarpingUtils.TransactionUtils.handleNewTransactions( maxFile2, 'max')
    // for (let discontFile of extractedFiles) {
    //     // @ts-ignore
    //     SharedUtils.excelUtils.excelFileScarpingUtils.TransactionUtils.handleNewTransactions(discontFile, 'discont')
    // }
}
