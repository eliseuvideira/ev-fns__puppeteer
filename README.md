# @ev-fns/puppeteer

Async puppeteer handler, that manages creating and closing a browser

- withBrowser `(handler: (browser: puppeteer.Browser, page: puppeteer.Page) => Promise<void>) => Promise<void>`

## Install

```sh
yarn add @ev-fns/puppeteer
```

## Usage

```js
const { withBrowser } = require("@ev-fns/puppeteer");

withBrowser(async (browser, page) => {
  await page.goto("https://www.npmjs.com/package/@ev-fns/puppeteer");
}).then(() => {
  console.log("browser closed");
});
```
