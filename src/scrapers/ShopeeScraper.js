import { Scraper } from "./Scraper.js"
// import puppeteer from "puppeteer"

export class ShopeeScraper extends Scraper {
  constructor({ baseUrl }) {
    super({ baseUrl })
  }

  async isProductPage() {
    return false
  }

  // async isProductPage() {
  //   const browser = await puppeteer.launch()

  //   const page = await browser.newPage()
  //   await page.goto("YOUR_SITE")

  //   const element = await page.waitForSelector("div > .class-name")
  //   await element.click()
  //   await element.dispose()

  //   await browser.close()
  // }
}
