import puppeteer from "puppeteer";

export const withBrowser = async (
  handler: (browser: puppeteer.Browser, page: puppeteer.Page) => Promise<void>,
  options: Record<string, any> = { args: [] }
) => {
  const browser = await puppeteer.launch({
    headless: !!+(process.env.HEADLESS || 0),
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      ...options.args,
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
