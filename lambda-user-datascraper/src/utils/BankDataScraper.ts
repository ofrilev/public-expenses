import {
  createBrowser,
  browserClose,
  filePath,
  getTodayDate,
} from "./scraperUtils";
import { saveScrapedFile } from "./saveScrapedFile";
import { Response } from "./scraperUtils";
import { scraperObject } from "./scraperObject";

const runScrapper = async (cookies: string): Promise<Response> => {
  const browser = await createBrowser();

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 820 });

  await page.setExtraHTTPHeaders({
    "user-agent":
      " Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
  });
  const resp = await scraperObject.tryLogin(page, cookies);
  if (resp == Response.SUCCESS) {
    const maxPage = await scraperObject.navigateToMax(page, browser);

    if (maxPage) {
      const client = await maxPage.target().createCDPSession();
      await client.send("Page.setDownloadBehavior", {
        behavior: "allow",
        downloadPath: filePath,
      });

      const resp = await scraperObject.getLastExpensesFromMax(maxPage);
      if (resp === Response.SUCCESS) {
        browserClose(browser);
        return Response.SUCCESS;
      }
    }
  }
  browserClose(browser);
  return Response.FAILED;
};

export const runAndSaveNewScrapeFile = async (
  cookies: string
): Promise<Response> => {
  const resp = await runScrapper(cookies);
  if (resp === Response.SUCCESS) {
    console.log(`scraping of ${getTodayDate()} complete`);
    let res = await saveScrapedFile();
    return res;
  } else {
    console.error("Failed for scraping new expenses from bank");
    return Response.FAILED;
  }
};
