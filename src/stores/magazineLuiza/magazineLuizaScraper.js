import { Store } from '../store.js';

export class MagazineLuizaScraper extends Store {
  constructor({ baseUrls }) {
    super({ baseUrls });
  }

  isProductPage() {
    const productNameElementQuery = document.body.querySelectorAll(
      'h1[data-testid="heading-product-title"]'
    );

    if (!(productNameElementQuery.length > 0)) return false;

    const productName = productNameElementQuery[0].innerText;

    const product = {
      name: productName,
    };

    return product;
  }

  getRequestData() {
    const startPath = '/mixer/_next/static/';
    const endPath = '/_buildManifest.js';
    const scriptSrc = document.querySelector(`script[src$='${endPath}']`).src;

    return this.#formatScriptSrc({ scriptSrc, startPath, endPath });
  }

  #formatScriptSrc({ scriptSrc, startPath, endPath }) {
    const startIndex = this.baseUrls[0].length + startPath.length;
    const endIndex = scriptSrc.length - endPath.length;
    return scriptSrc.substring(startIndex, endIndex);
  }
}
