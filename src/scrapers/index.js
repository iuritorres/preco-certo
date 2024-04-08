import { AmazonScraper } from "./AmazonScraper.js"
import { MagazineLuizaScraper } from "./MagazineLuizaScraper.js"
import { ShopeeScraper } from "./ShopeeScraper.js"

export const scrapers = {
  amazon: new AmazonScraper({
    baseUrl: "https://www.amazon.com.br",
  }),
  magazineLuiza: new MagazineLuizaScraper({
    baseUrl: "https://www.magazineluiza.com.br",
  }),
  shopee: new ShopeeScraper({
    baseUrl: "https://shopee.com.br",
  }),
}
