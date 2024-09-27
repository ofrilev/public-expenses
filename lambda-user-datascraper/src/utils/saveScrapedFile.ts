import * as fs from "fs";
import { filePath, getTodayDate } from "./scraperUtils";
import { Response } from "./scraperUtils";
import { join } from "path";

export const fileNewName = getTodayDate() + "_" + "transaction-details.xlsx";
export const saveScrapedFile = async (): Promise<Response> => {
  const newScrapedFile = fs.readdirSync(filePath).filter((f) => {
    console.log(`Found file: ${f}`);
    return f.includes(".xlsx");
  })[0];
  if (!newScrapedFile) {
    console.log(`no new excel file found in ${filePath} `);
    return Response.FAILED;
  }
  fs.rename(
    join(filePath, newScrapedFile),
    join(filePath, fileNewName),
    (err: any) => {
      if (err) {
        console.error("Rename Failed");
        throw err;
      }
      return Response.FAILED;
    }
  );
  console.log("Rename complete!");
  return Response.SUCCESS;
};
