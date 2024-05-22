import { AffiliateConfig } from '../../config/affiliate.js';

export class ShopeeInjector {
  #blockedPathnames = ['/cart/'];

  #hasAffiliateParams(currentURL) {
    const utmSourceParam = currentURL.searchParams.get('utm_source');

    return (
      utmSourceParam && utmSourceParam === `an_${AffiliateConfig.shopee.id}`
    );
  }

  #getAffiliateParams(currentURL) {
    const affiliateParams = {
      utm_content: `Preço_Certo-`,
      utm_medium: 'affiliates',
      utm_source: `an_${AffiliateConfig.shopee.id}`,
    };

    Object.keys(affiliateParams).forEach((param) => {
      if (currentURL.searchParams.has(param)) {
        currentURL.searchParams.delete(param);
      }
    });

    Object.keys(affiliateParams).forEach((param) => {
      currentURL.searchParams.append(param, affiliateParams[param]);
    });

    return currentURL;
  }

  bindAffiliateID({ currentURL }) {
    if (this.#blockedPathnames.includes(currentURL.pathname)) return;

    const isAffiliateURL = this.#hasAffiliateParams(currentURL);

    if (!isAffiliateURL) {
      return this.#getAffiliateParams(currentURL);
    }
  }
}
