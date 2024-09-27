import { Browser, Page } from "puppeteer";

import fs from "fs";
import {
  login_discont as loginLocators,
  login_max,
  max,
  navigate,
} from "./BanksSiteUtils/discont/locators";
import { createBrowser, browserClose } from "./utils";

const newScrapedFilePath =
  "/Users/ofri.levkowitz/expenses/bankDataScraper/src/recentScarpedExpenses/newScrapedFile";
const recentScrapedExpensesPath =
  "/Users/ofri.levkowitz/expenses/bankDataScraper/src/recentScrapedExpenses";

export enum Response {
  FAILED = "failed",
  SUCCESS = "success",
}

const getTodayDate = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${day}-${month}-${year}`;
};
const getNDayBefore = (number: number): string => {
  const today = new Date();
  let newDay = new Date(today);
  newDay.setDate(today.getDate() - number);
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(newDay.getDate()).padStart(2, "0");
  return `${day}-${month}-${year}`;
};

const mimicUserBehavior = async (page: Page) => {
  console.log("mimic a user behavior");
  await page.waitForTimeout((Math.floor(Math.random() * 10) + 5) * 1000);
  await page.mouse.move(
    (Math.floor(Math.random() * 12) + 5) * 1000,
    (Math.floor(Math.random() * 12) + 5) * 1000
  );
};

export const scraperObject = {
  url: process.env.BANK_URL as string,
  async setCookies(page: Page) {
    try {
      // Saved cookies reading
      const cookies = fs.readFileSync("discont-scraper-cookies.json", "utf8");
      if (cookies) {
        const deserializedCookies = JSON.parse(cookies);
        await page.setCookie(...deserializedCookies);
        console.log("page set the site existing cookies");
      } else {
        const cookies = await page.cookies();
        const cookieJson = JSON.stringify(cookies);
        // And save this data to a JSON file
        fs.writeFileSync("discont-scraper-cookies.json", cookieJson);
        console.log("saved new cookies");
      }
    } catch (err) {
      throw new Error(
        `failed to get cookies and set them from browser with err: ${err}`
      );
    }
  },

  async tryLogin(page: Page): Promise<Response | undefined> {
    try {
      console.log(`Navigating to ${this.url}...`);
      await page.goto(this.url);
      await this.setCookies(page);
      let idInputElement = await page.$(loginLocators.inputIdNumber);
      let passwordInputElement = await page.$(loginLocators.inputPassword);
      let recCodeInputElement = await page.$(loginLocators.inputRecCode);
      let submitButtonElement = await page.$(loginLocators.buttonSubmit);
      console.log("fill login fields..");
      if (idInputElement !== null)
        await idInputElement.type(process.env.BANK_LOGIN_ID as string);
      if (passwordInputElement !== null)
        await passwordInputElement.type(
          process.env.BANK_LOGIN_PASSWORD as string
        );
      await mimicUserBehavior(page);
      if (recCodeInputElement !== null)
        await recCodeInputElement.type(
          process.env.BANK_LOGIN_RECOGNIZE_CODE as string
        );
      await mimicUserBehavior(page);
      if (submitButtonElement !== null) await submitButtonElement.click();
      await page.waitForNavigation({ timeout: 100000 });
      console.log("redirect to discont home-page ...");
      if (
        page.url() ==
        "https://start.telebank.co.il/apollo/retail/#/MY_ACCOUNT_HOMEPAGE"
      ) {
        console.log("redirect to discont home-page successfully");
        return Response.SUCCESS;
      } else return Response.FAILED;
    } catch (err) {
      console.error(`failed to login with error: ${err}`);
      console.trace();
      return Response.FAILED;
    }
  },
  async navigateToMax(page: Page, browser: Browser): Promise<Page | null> {
    try {
      await page.waitForSelector(navigate.sideBarCreditCard, { timeout: 6000 });
      let sideBarCreditCard = await page.$(navigate.sideBarCreditCard);
      let sideBarCreditCardMax = await page.$(navigate.sideBarCreditCardMax);
      if (sideBarCreditCard !== null) await sideBarCreditCard.click();
      console.log("click on sideBarCreditCard ");
      await mimicUserBehavior(page);
      if (sideBarCreditCardMax !== null) await sideBarCreditCardMax.click();
      console.log("click on sideBarCreditCard max ");
      await mimicUserBehavior(page);
      let approveMaxRedirect = await page.$(navigate.approveMaxRedirect);
      if (approveMaxRedirect !== null) await approveMaxRedirect.click();
      console.log("click on max redirect approve ");
      const newTarget = await browser.waitForTarget(
        (target) => target.opener() === page.target()
      );
      const maxPage = await newTarget.page();
      maxPage?.setViewport({ width: 1280, height: 720 });
      console.log("switch to new tab");
      if (maxPage) {
        await mimicUserBehavior(maxPage);
        console.log("redirect to max home-page ...");
        await maxPage.waitForTimeout(10000);
        let login_with_password_option = await maxPage.waitForSelector(
          login_max.login_with_password_option,
          { timeout: 20000 }
        );
        console.log("redirect to max home-page successfully");
        await login_with_password_option?.click();
        console.log("switch to login with password");
        let inputUserName = await maxPage.$(login_max.inputUserName);
        let inputPassword = await maxPage.$(login_max.inputPassword);
        await mimicUserBehavior(maxPage);
        console.log("fill max login fields..");
        if (inputUserName !== null)
          await inputUserName.type(process.env.MAX_LOGIN_USERNAME as string);
        await mimicUserBehavior(maxPage);
        if (inputPassword !== null)
          await inputPassword.type(process.env.MAX_LOGIN_PASWORD as string);
        let buttonSubmit = await maxPage.$$(login_max.buttonSubmit);
        if (buttonSubmit[1] !== null) await buttonSubmit[1].click();
        const popUp_dismiss_exists = await maxPage.evaluate((selector) => {
          const elements = document.querySelectorAll(selector);
          return elements.length > 0;
        }, max.popUp_dismiss);
        if (popUp_dismiss_exists) {
          let popUp_dismiss = await maxPage.waitForSelector(max.popUp_dismiss, {
            timeout: 10000,
          });
          if (popUp_dismiss) {
            await popUp_dismiss.click();
          }
        }
        // let i = 0;
        // while (i <= 4) {
        //     if (await popUp_dismiss?.isVisible()) {
        //         popUp_dismiss?.click()
        //         console.log(`clicked ${i} times on cancel`)
        //         i++
        //     } else {
        //         break;
        //     }

        await maxPage.waitForSelector(max.expensesInfoButton, {
          timeout: 20000,
        });
        return maxPage;
      } else {
        return null;
      }
    } catch (err) {
      throw new Error(`failed to take last expense to max with error: ${err}`);
    }
  },
  async getLastExpensesFromMax(maxPage: Page): Promise<Response> {
    try {
      let expensesInfoButton = await maxPage.$$(max.expensesInfoButton);
      if (expensesInfoButton[0] !== null) await expensesInfoButton[0].click();
      console.log("click on recent expenses ");
      let recentExpensesInExcelButton = await maxPage.waitForSelector(
        max.recentExpensesInExcelButton,
        { timeout: 60000 }
      );
      console.log("click on excel download");
      if (recentExpensesInExcelButton !== null)
        await recentExpensesInExcelButton.click();
      if (fs.readdirSync(newScrapedFilePath)[0] === undefined) {
        await mimicUserBehavior(maxPage);
        console.log(" retry to click on excel download");
        if (recentExpensesInExcelButton !== null)
          await recentExpensesInExcelButton.click();
      }
      return Response.SUCCESS;
    } catch (err) {
      console.error(`failed to get last expenses from max with error: ${err}`);
      console.trace();
      return Response.FAILED;
    }
  },
};
const runScrapper = async (): Promise<Response> => {
  const browser = await createBrowser();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.setExtraHTTPHeaders({
    "user-agent":
      " Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
  });
  // @ts-ignore
  const resp = await scraperObject.tryLogin(page);
  if (resp == Response.SUCCESS) {
    // @ts-ignore
    const maxPage = await scraperObject.navigateToMax(page, browser);
    // @ts-ignore
    if (maxPage) {
      const client = await maxPage.target().createCDPSession();
      await client.send("Page.setDownloadBehavior", {
        behavior: "allow",
        downloadPath: newScrapedFilePath,
      });
      const resp = await scraperObject.getLastExpensesFromMax(maxPage);
      if (resp === Response.SUCCESS) {
        browserClose(browser);
        return Response.SUCCESS;
      }
      browserClose(browser);
      return Response.FAILED;
    }
    browserClose(browser);
    return Response.FAILED;
  }
  browserClose(browser);
  return Response.FAILED;
};

const saveScrapedFile = async () => {
  const newScrapedFile = fs.readdirSync(newScrapedFilePath)[0];
  if (newScrapedFile) {
    const fileNewName = `${getTodayDate()}_transaction-details.xlsx`;
    fs.rename(
      `${newScrapedFilePath}/${newScrapedFile}`,
      `${newScrapedFilePath}/${fileNewName}`,
      (err) => {
        if (err) throw err;
        console.log("Rename complete!");
        return;
      }
    );
  }
  console.log("no file is found in newScrapedFile");
};

export const runAndSaveNewScrapeFile = async () => {
  const resp = await runScrapper();
  if (resp === Response.SUCCESS) {
    console.log(`scraping of ${getTodayDate()} complete`);
    saveScrapedFile();
  } else {
    throw new Error("Failed for scraping new expenses from bank");
  }
};
