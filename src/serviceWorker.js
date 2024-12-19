import { Events } from "./constants/events";
import { Injectors } from "./constants/injectors";
import { Scrapers } from "./constants/scrapers";

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
      const formattedProductName = request.productName
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/ /g, "+")
        .replace(/[^a-z0-9+]/g, "");

      const requestURL = `${Scrapers["MAGAZINE_LUIZA"].baseUrls[0]}/busca/${formattedProductName}/?from=submit`;

      fetch(requestURL)
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
        `Erro ao fazer requisição para ${Scrapers["MAGAZINE_LUIZA"].baseUrls[0]}`
      );

      throw error;
    }

    return true;
  }

  if (request.event === Events.REQUEST_MAGAZINE_LUIZA) {
    try {
      const url = Scrapers["MAGAZINE_LUIZA"].baseUrls[0];

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
