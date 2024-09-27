import ClientDbClass from "./utils/dbsUtils/ClientDbClass";
import * as excelFileScarpingUtils from "./utils/excelUtils/excelFileScarpingUtils";
import { readExcelFile } from "./utils/excelUtils/readExcelFile";
import {
  getBusinessesSummary,
  buildCategoriesHierarchy,
  escapedString,
} from "./utils/dataFormatter";
import { transactionObj } from "./utils/excelUtils/excelFileScarpingUtils";
import { insertExpenses } from "./utils/insertOldDb";
import { insertBusiness } from "./utils/insertBusinsess";
import {
  containsHebrewChars,
  runSplitCsvByHebrewChars,
} from "./utils/splitCsvHebrewChar";
//insert expenses from csv
// insertExpenses();
////insert businessNames from csv
// insertBusiness()
export const SharedUtils = {
  dbUtils: ClientDbClass,
  excelUtils: { excelFileScarpingUtils, readExcelFile },
  dataFormatter: {
    getBusinessesSummary,
    buildCategoriesHierarchy,
    containsHebrewChars,
    escapedString,
  },
};
export type { transactionObj };
