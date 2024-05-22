import { AffiliateConfig } from '../../config/affiliate';
import { Scrapers } from '../../constants/scrapers';

export class MagazineLuizaInjector {
  #blockedPathnames = [];

  #isAffiliateURL(currentURL) {
    const isMyPartnerURL =
      currentURL.origin === Scrapers['MAGAZINE_LUIZA'].baseUrls[1] &&
      currentURL.pathname.startsWith(AffiliateConfig.magazineLuiza.pathname);

    if (!isMyPartnerURL) return false;

    return true;
  }

  #getAffiliateURL(currentURL) {
    const isPartnerURL =
      currentURL.origin === Scrapers['MAGAZINE_LUIZA'].baseUrls[1];

    if (!isPartnerURL) {
      const URLOrigin = Scrapers['MAGAZINE_LUIZA'].baseUrls[1];
      const URLPathname = `${AffiliateConfig.magazineLuiza.pathname}${currentURL.pathname}`;

      const newURL = new URL(`${URLOrigin}${URLPathname}`);

      return newURL;
    }

    const partnerPathEnd = currentURL.pathname.indexOf('/', 1);
    const productPathname = currentURL.pathname.substring(partnerPathEnd);
    currentURL.pathname = `${AffiliateConfig.magazineLuiza.pathname}${productPathname}`;

    return currentURL;
  }

  bindAffiliateID({ currentURL }) {
    if (this.#blockedPathnames.includes(currentURL.pathname)) return;

    const isAffiliatePage = this.#isAffiliateURL(currentURL);

    if (!isAffiliatePage) {
      return this.#getAffiliateURL(currentURL);
    }
  }
}
