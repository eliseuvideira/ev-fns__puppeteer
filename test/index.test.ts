import puppeteer from "puppeteer";
import { withBrowser } from "../src/index";

describe("withBrowser", () => {
  it("launches a browser", async () => {
    expect.assertions(4);
    const close = jest.fn();
    const launch = jest.fn();
    const browser = { pages: () => [1, 2], close };
    launch.mockReturnValue(browser);
    const _ = puppeteer.launch;
    puppeteer.launch = launch;

    try {
      await withBrowser(async (browser, page) => {
        expect(browser).toBe(browser);
        expect(page).toBe(browser.pages()[0]);
      });
      expect(launch).toHaveBeenCalledTimes(1);
      expect(close).toHaveBeenCalledTimes(1);
    } finally {
      puppeteer.launch = _;
    }
  });
});
