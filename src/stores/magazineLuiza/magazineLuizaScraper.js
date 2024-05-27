import { Events } from '../../constants/events.js';
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

  async getRequestData() {
    const DOM = await this.#getStoreDOM();

    const startPath = '/mixer/_next/static/';
    const endPath = '/_buildManifest.js';
    const scriptSrc = DOM.querySelector(`script[src$='${endPath}']`).src;

    return this.#formatScriptSrc({ scriptSrc, startPath, endPath });
  }

  async #getStoreDOM() {
    return new Promise((resolve, reject) => {
      try {
        chrome.runtime.sendMessage(
          {
            event: Events.REQUEST_MAGAZINE_LUIZA,
          },
          (response) => {
            if (chrome.runtime.lastError) {
              return reject(chrome.runtime.lastError);
            }

            const parser = new DOMParser();
            const DOM = parser.parseFromString(response.html, 'text/html');
            resolve(DOM);
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  #formatScriptSrc({ scriptSrc, startPath, endPath }) {
    const pathname = new URL(scriptSrc).pathname;
    const startIndex = startPath.length;
    const endIndex = pathname.length - endPath.length;

    return pathname.substring(startIndex, endIndex);
  }
}
