import { AmazonScraper } from "../stores/amazon/amazonScraper.js";
import { MagazineLuizaScraper } from "../stores/magazineLuiza/magazineLuizaScraper.js";
import { ShopeeScraper } from "../stores/shopee/shopeeScraper.js";

export const Scrapers = {
  AMAZON: new AmazonScraper({
    baseUrls: ["https://www.amazon.com.br"],
  }),
  MAGAZINE_LUIZA: new MagazineLuizaScraper({
    baseUrls: [
      "https://www.magazineluiza.com.br",
      "https://www.magazinevoce.com.br",
    ],
  }),
  SHOPEE: new ShopeeScraper({
    baseUrls: ["https://shopee.com.br"],
  }),
};
