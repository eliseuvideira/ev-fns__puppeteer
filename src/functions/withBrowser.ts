import puppeteer from "puppeteer";

export const withBrowser = async (
  handler: (browser: puppeteer.Browser, page: puppeteer.Page) => Promise<void>
) => {
  const browser = await puppeteer.launch({
    headless: !!+(process.env.HEADLESS || 0),
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
    ],
  });

  try {
    const pages = await browser.pages();
    const page = pages[0];

    await handler(browser, page);
  } finally {
    await browser.close();
  }
};
