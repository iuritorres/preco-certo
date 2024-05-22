import { Store } from '../store.js';

export class AmazonScraper extends Store {
  constructor({ baseUrls }) {
    super({ baseUrls });
  }

  isProductPage() {
    return false;
  }
}
