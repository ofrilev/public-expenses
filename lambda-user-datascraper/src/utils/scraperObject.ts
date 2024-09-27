import { Page, Browser } from "puppeteer-core";
import {
  findWithRetry,
  filePath,
  mimicUserBehavior,
  readCookiesFromFile,
} from "./scraperUtils";
import {
  login_discont as loginLocators,
  login_max,
  max,
  navigate,
} from "../BanksSiteUtils/discont/locators";
import * as fs from "fs";
import { Response } from "./scraperUtils";

export const scraperObject = {
  url: process.env.BANK_URL as string,
  async setCookies(page: Page, cookies: string) {
    try {
      // Saved cookies reading
      if (cookies) {
        const deserializedCookies = readCookiesFromFile(
          "discont-scraper-cookies.json"
        );
        await page.setCookie(...deserializedCookies);
        console.log("page set the site existing cookies");
      } else {
        const cookies = await page.cookies();
        const cookieJson = JSON.stringify(cookies);
        // And save this data to a JSON file

        //todo: consider upload to s3, and also take from
        fs.writeFileSync("discont-scraper-cookies.json", cookieJson);
        console.log("saved new cookies");
      }
    } catch (err) {
      throw new Error(
        `failed to get cookies and set them from browser with err: ${err}`
      );
    }
  },

  async tryLogin(page: Page, cookies: string): Promise<Response | undefined> {
    try {
      console.log(`Navigating to ${this.url}...`);
      await page.goto(this.url);
      // await this.setCookies(page, cookies);
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
      let sideBarCreditCard = await findWithRetry(
        page,
        navigate.sideBarCreditCard
      );
      if (sideBarCreditCard) {
        await sideBarCreditCard.click();
        console.log("Clicked on sideBarCreditCard");
      } else {
        console.error("Failed to find button sideBarCreditCard");
        return null; // Exit if the button is not found
      }
      await mimicUserBehavior(page);

      // Wait for the sidebar credit card max link and click
      // const sideBarCreditCardMax = await page.waitForSelector(
      //   navigate.sideBarCreditCardMax,
      //   { timeout: 6000 }
      // );
      let sideBarCreditCardMax = await findWithRetry(
        page,
        navigate.sideBarCreditCardMax
      );
      if (sideBarCreditCardMax) {
        await sideBarCreditCardMax.click();
        console.log("Clicked on sideBarCreditCardMax");
      } else {
        console.error("Failed to find button sideBarCreditCardMax");
        return null; // Exit if the button is not found
      }
      await mimicUserBehavior(page);

      // Wait for the approve max redirect link and click
      let approveMaxRedirect = await findWithRetry(
        page,
        navigate.approveMaxRedirect
      );
      if (approveMaxRedirect) {
        await approveMaxRedirect.click();
        console.log("Clicked on approveMaxRedirect");
      } else {
        console.error("Failed to find button approveMaxRedirect");
        return null; // Exit if the button is not found
      }

      // Wait for the new page to open after clicking the link
      const newTarget = await browser.waitForTarget(
        (target) => target.opener() === page.target()
      );
      const maxPage = await newTarget.page();
      if (!maxPage) {
        console.error("New page did not open");
        return null; // Exit if the new page did not open
      }
      await maxPage.setViewport({ width: 1777, height: 466 });
      console.log("Switched to new tab");

      await mimicUserBehavior(maxPage);
      console.log("Redirecting to max home-page...");

      // Wait for the login option and interact
      const loginWithPasswordOption = await maxPage.waitForSelector(
        login_max.login_with_password_option,
        { timeout: 100000 }
      );
      console.log("Redirected to max home-page successfully");
      if (loginWithPasswordOption != null) {
        await loginWithPasswordOption?.click();
        console.log("click on login with password");
      } else {
        console.error("failed to get login with password button");
      }

      // Fill login fields
      const inputUserName = await maxPage.waitForSelector(
        login_max.inputUserName
      );
      const inputPassword = await maxPage.waitForSelector(
        login_max.inputPassword
      );
      await mimicUserBehavior(maxPage);
      await mimicUserBehavior(maxPage);
      console.log("Filling max login fields...");
      if (inputUserName) {
        await inputUserName.type(process.env.MAX_LOGIN_USERNAME as string);
      }
      if (inputPassword) {
        let pass = process.env.MAX_LOGIN_PASWORD as string;
        await inputPassword.type(pass);
      }

      // Click the submit button
      const buttonSubmit = await maxPage.$$(login_max.buttonSubmit);
      if (buttonSubmit[1]) await buttonSubmit[1].click();

      // Check and interact with popup dismiss
      const popUpDismissExists = await maxPage.evaluate(
        (selector) => document.querySelectorAll(selector).length > 0,
        max.popUp_dismiss
      );
      if (popUpDismissExists) {
        const popUpDismiss = await maxPage.waitForSelector(max.popUp_dismiss, {
          timeout: 10000,
        });
        if (popUpDismiss) {
          await popUpDismiss.click();
          console.log("Clicked on pop-up dismiss");
        }
      }
      console.log("Waiting for page to load");
      let isMaxPage = await findWithRetry(
        maxPage,
        max.expensesInfoButton,
        2000
      );
      if (isMaxPage != null) {
        console.log("page loaded successfully");
        //   await isMaxPage.click();
        return maxPage;
      } else {
        throw Error(
          `Failed to navigate max, button: ${max.expensesInfoButton}. was not visible`
        );
      }
    } catch (err) {
      browser.close();
      throw new Error(`Failed to navigate to Max with error: ${err}`);
    }
  },
  async getLastExpensesFromMax(maxPage: Page): Promise<Response> {
    try {
      let expensesInfoButton = await findWithRetry(
        maxPage,
        max.expensesInfoButton
      );
      if (expensesInfoButton !== null) {
        await expensesInfoButton.click();
      }
      console.log("click on recent expenses ");
      let recentExpensesInExcelButton = await maxPage.waitForSelector(
        max.recentExpensesInExcelButton,
        { timeout: 20000 }
      );
      // let recentExpensesInExcelButton = await findWithRetry(
      //   maxPage,
      //   max.recentExpensesInExcelButton
      // );

      if (recentExpensesInExcelButton !== null) {
        await recentExpensesInExcelButton.click();
        console.log("click on excel download");
      }
      //  else {
      //   recentExpensesInExcelButton = await findWithRetry(
      //     maxPage,
      //     max.recentExpensesInExcelButton
      //   );
      // }
      const isExcelFileDownloaded = (): boolean => {
        const tmpFiles = fs.readdirSync(filePath);
        if (tmpFiles?.length && tmpFiles?.length > 0) {
          return tmpFiles.some((f) => f.endsWith(".xlsx"));
        }
        return false;
      };
      if (isExcelFileDownloaded()) {
        console.log("file downloaded successfully");
        return Response.SUCCESS;
      }
      await mimicUserBehavior(maxPage);
      console.log("retry to click on excel download");
      await recentExpensesInExcelButton.click();
      console.log("click on excel download");
      if (isExcelFileDownloaded()) {
        return Response.SUCCESS;
      } else {
        return Response.FAILED;
      }
    } catch (err) {
      console.error(`failed to get last expenses from max with error: ${err}`);
      console.trace();
      return Response.FAILED;
    }
  },
};
