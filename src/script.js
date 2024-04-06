import {
  AmazonScraper,
  MagazineLuizaScraper,
  ShopeeScraper,
} from "./scrapers/index.js"

const scrapers = {
  amazon: new AmazonScraper({
    baseUrl: "https://www.amazon.com.br/",
  }),
  magazineLuiza: new MagazineLuizaScraper({
    baseUrl: "https://www.magazineluiza.com.br/",
  }),
  shopee: new ShopeeScraper({
    baseUrl: "https://shopee.com.br/",
  }),
}

// Listen to `serviceWorker.js` Worker
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "url_change") {
    // Here, probably will come something about
    // check if it's a product page, and if it is, get the product data

    // scrapers.amazon.func()
  }
})
