// import { AmazonInjector } from "../stores/amazon/amazonInjector.js"
import { MagazineLuizaInjector } from "../stores/magazineLuiza/magazineLuizaInjector.js"
import { ShopeeInjector } from "../stores/shopee/shopeeInjector.js"

export const Injectors = {
  // AMAZON: new AmazonInjector(),
  MAGAZINE_LUIZA: new MagazineLuizaInjector(),
  SHOPEE: new ShopeeInjector(),
}
