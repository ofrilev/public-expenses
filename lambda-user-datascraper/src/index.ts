import { Response } from "./utils/scraperUtils";
import { init, uploadFileToUserPath } from "./utils/s3Utils";
import { fileNewName } from "./utils/saveScrapedFile";
import { filePath } from "./utils/scraperUtils";
import * as path from "path";
import { runAndSaveNewScrapeFile } from "./utils/bankDataScraper";

process.on("uncaughtException", (err) => {
  console.error("Unhandled Exception:", err);
  debugger; // This will trigger the debugger to stop here
});

export const handler = async (event: any): Promise<any> => {
  try {
    await init();
    const cookiesStr = JSON.stringify(event.cookies);
    const res = await runAndSaveNewScrapeFile(cookiesStr);
    if (res == Response.SUCCESS) {
      const fileNewPath = path.join(filePath, fileNewName);
      await uploadFileToUserPath(fileNewPath, fileNewName);
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Scrape Succeeded",
        }),
      };
    } else {
      console.log("Failed to scrape");
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: "Scrape Failed", // Custom failure message
        }),
      };
    }
  } catch (error) {
    console.error("Error during scraping:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error during scraping", // Custom error message
        error: error.message, // You can remove this line if you don't want to include error details
      }),
    };
  }
};
//todo: enable when running locally
// handler({ cookies: "" });
