import puppeteer, { Browser, Page } from "puppeteer-core";
import chromuim from "@sparticuz/chromium";
export const filePath = "/tmp";
import * as fs from "fs";

// const importPath = process.env.LAMBDA_TASK_ROOT;
// ? "/opt/nodejs/node_modules/@sparticuz/chromium-min/build/index.js"
// :
// ("@sparticuz/chromium");
export enum Response {
  FAILED = "failed",
  SUCCESS = "success",
}
export const readCookiesFromFile = (filePath: string) => {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading cookies from file:", err);
    throw err;
  }
};
export const getTodayDate = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${day}-${month}-${year}`;
};
export const mimicUserBehavior = async (page: Page) => {
  console.log("mimic a user behavior");
  // await page.waitForTimeout(2);
  await page.waitForTimeout((Math.floor(Math.random() * 10) + 5) * 1000);
  await page.mouse.move(
    (Math.floor(Math.random() * 12) + 5) * 1000,
    (Math.floor(Math.random() * 12) + 5) * 1000
  );
};

export const createBrowser = async (): Promise<Browser> => {
  // const { default: chromium } = await import(importPath);
  try {
    console.log("Opening the browser......");
    // identify whether we are running locally or in AWS
    const isLocal = process.env.AWS_EXECUTION_ENV === undefined;

    const browser = isLocal
      ? // if we are running locally, use the puppeteer that is installed in the node_modules folder
        await require("puppeteer").launch({
          headless: false,
        })
      : // if we are running in AWS, download and use a compatible version of chromium at runtime
        await puppeteer.launch({
          args: [
            ...chromuim.args,
            "--hide-scrollbars",
            "--disable-web-security",
          ],
          defaultViewport: chromuim.defaultViewport,
          executablePath: await chromuim.executablePath(),
        });
    console.log("browser is up");
    return browser;
  } catch (err) {
    console.log("Could not create a browser instance => : ", err);
    throw err;
  }
};

export const browserClose = async (browser: any) => {
  const pages = await browser.pages();
  for (let i in pages) {
    await pages[i].close();
  }
  browser.close();
  console.log("close chrome browser");
};
export const findWithRetry = async (
  page: Page,
  selector: string,
  maxAttempts = 10,
  delay = 5000
) => {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      // Attempt to find the element in the DOM
      const element = await page.$(selector);

      // If the element is found, return it
      if (element) return element;

      // If not found and attempts remain, wait for the specified delay and retry
      if (attempt < maxAttempts) {
        console.log(
          `Retry ${attempt}/${maxAttempts} for selector: "${selector}"`
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    } catch (error) {
      // Log an error message and rethrow the error on the final attempt
      console.error(
        `Error on attempt ${attempt} for selector "${selector}": ${error}`
      );
      if (attempt === maxAttempts)
        throw new Error(
          `Failed to find selector "${selector}" after ${maxAttempts} attempts. Error: ${error.message}`
        );
    }
  }

  // Throw an error if the element wasn't found after the maximum number of attempts
  throw new Error(
    `Selector "${selector}" not found after ${maxAttempts} attempts.`
  );
};
