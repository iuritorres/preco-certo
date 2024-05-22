import { Events } from './constants/events';
import { Scrapers } from './constants/scrapers';

function isURL(object) {
  try {
    let url = new URL(object);
    return true;
  } catch (error) {
    return false;
  }
}

function setNewURL(newURL) {
  const currentURL = window.location.href;

  if (isURL(newURL) && currentURL != newURL) window.location.href = newURL;
}

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.event === Events.URL_CHANGE) {
    const pageProduct = Scrapers[request.currentStoreKey].isProductPage();

    if (pageProduct) {
      console.log('IS PRODUCT PAGE!');

      setNewURL(request.newURL);

      const requestData = Scrapers['MAGAZINE_LUIZA'].getRequestData();
      chrome.runtime.sendMessage(
        {
          event: Events.REQUEST_SEARCH_PRODUCT,
          productName: pageProduct.name,
          requestData,
        },
        (response) => {
          console.log('Query has finished.', response);
        }
      );

      // try {
      //   const startTime = performance.now();

      //   const response = await fetch(`${API}/scraping/search-product`, {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({
      //       name: pageProduct.name,
      //     }),
      //   }).then((response) => response.json());
      //   const endTime = performance.now();

      //   console.log(`${endTime - startTime} milliseconds.`);
      //   console.log('PC-PRODUTOS:', response.products);
      // } catch (error) {
      //   console.error(error);
      // }
    }
  }
});
