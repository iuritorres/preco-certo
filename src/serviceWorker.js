import { Events } from './constants/events';
import { Injectors } from './constants/injectors';
import { Scrapers } from './constants/scrapers';

// chrome.runtime.onInstalled.addListener(({ reason }) => {
//   if (reason === "install") {
//     chrome.tabs.create({
//       url: "onboarding.html",
//     })
//   }
// })

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  const currentDomain = new URL(tab.url).origin;
  const availableDomains = Object.keys(Scrapers)
    .map((storeKey) => Scrapers[storeKey].baseUrls)
    .flat();

  if (availableDomains.includes(currentDomain)) {
    const currentStoreKey = Object.keys(Scrapers).filter((storeKey) =>
      Scrapers[storeKey].baseUrls.includes(currentDomain)
    );

    const newURL = Injectors[currentStoreKey].bindAffiliateID({
      currentURL: new URL(tab.url),
    });

    chrome.tabs.sendMessage(tabId, {
      event: Events.URL_CHANGE,
      currentStoreKey,
      newURL,
    });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.event === Events.REQUEST_SEARCH_PRODUCT) {
    try {
      const requestData = request.requestData;
      const cookieHeader =
        'FCCDCF=1; FCNEC=1; MLPARCEIRO=0; mixer_hub_shipping=true; mixer_shipping=AUTO; ml2_redirect_8020=0; noe_freight=AUTO; noe_hub_shipping_enabled=1; toggle_ads=true; toggle_agatha=true; toggle_new_service_page=true; toggle_pdp_seller_score=true; toggle_search_ads=true; toggle_vwo=true; toggle_wishlist=false; __uzma=a06fa7ad-0a61-4d3e-843e-4b3aed259db5; __uzmb=1714683493; __uzmc=675681942700; __uzmd=1714684882; __uzme=1999';
      const formattedProductName = request.productName
        .toLowerCase()
        .replace('/', '')
        .replace('\\', '')
        .replace('-', '')
        .replace('_', '')
        .replaceAll(' ', '%2B');

      const requestURL = `${Scrapers['MAGAZINE_LUIZA'].baseUrls[0]}/_next/data/${requestData}/busca/${formattedProductName}.json?path1=${formattedProductName}`;

      fetch(requestURL, {
        method: 'GET',
        headers: {
          Accept: '*/*',
          Cookie: cookieHeader,
          Connection: 'keep-alive',
          'Accept-Encoding': 'gzip, deflate, br',
        },
      })
        .then((result) => {
          try {
            return result.json();
          } catch (error) {
            throw error;
          }
        })
        .then((response) => {
          const firstProductResult = response.pageProps.data.search.products[0];

          const product = {
            name: firstProductResult.title,
            price: parseFloat(firstProductResult.price.bestPrice),
            url: `https://www.magazinevoce.com.br/magazineextprecocerto/${firstProductResult.path}`,
            rating: {
              count: firstProductResult.rating.count,
              score: firstProductResult.rating.score,
            },
          };

          sendResponse({ product });
        });
    } catch (error) {
      console.error(
        `Erro ao fazer requisição para ${Scrapers['MAGAZINE_LUIZA'].baseUrls[0]}`
      );

      throw error;
    }

    return true;
  }

  if (request.event === Events.REQUEST_MAGAZINE_LUIZA) {
    try {
      const url = Scrapers['MAGAZINE_LUIZA'].baseUrls[0];

      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Erro ao fazer requisição para ${url}`);
          }

          return response.text();
        })
        .then((html) => sendResponse({ html }));
    } catch (error) {
      throw new error();
    }

    return true;
  }
});
