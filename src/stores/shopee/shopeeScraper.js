import { Store } from '../store.js';

export class ShopeeScraper extends Store {
  constructor({ baseUrls }) {
    super({ baseUrls });
  }

  isProductPage() {
    if (!(document.body.querySelectorAll('div.page-product').length > 0))
      return false;

    const productName = document.body.querySelector(
      'div[class="WBVL_7"] > span'
    ).innerText;

    const product = {
      name: productName,
    };

    return product;
  }
}
