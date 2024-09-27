import { runAndSaveNewScrapeFile } from "./BankDataScraper";
import { addNewScrapedExpenses } from "./AddRecentScrapedExpenses/addRecentScrapedExpenses";

const main = function () {
  runAndSaveNewScrapeFile().then(() =>
    addNewScrapedExpenses().then(() => {
      console.log("finish to scrape and update for today expenses ");
      process.exit();
    })
  );
};
// main();
// addNewScrapedExpenses();
runAndSaveNewScrapeFile();
