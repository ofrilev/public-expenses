import puppeteer, { Browser } from "puppeteer";

export const createBrowser = async (): Promise<Browser> => {
  let browser;
  try {
    console.log("Opening the browser......");
    browser = await puppeteer.launch({
      executablePath: process.env.CHROMUIM_EXEC_PATH,
      headless: false,
      args: ["--disable-setuid-sandbox"],
      ignoreHTTPSErrors: true,
    });
    return browser;
  } catch (err) {
    console.log("Could not create a browser instance => : ", err);
    throw err;
  }
};

export const browserClose = async (browser: Browser) => {
  const pages = await browser.pages();
  for (let i in pages) {
    await pages[i].close();
  }
  browser.close();
  console.log("close chrome browser");
};
//todo: make a file logger object, which there ill stor all the logs when the scrpaing occurs */

// const Cl logScrapingToFile = () => {}
