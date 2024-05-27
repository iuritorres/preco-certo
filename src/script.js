import { Events } from './constants/events';
import { Scrapers } from './constants/scrapers';
import { setNewURL } from './functions/setNewURL';

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.event === Events.URL_CHANGE) {
    const pageProduct = Scrapers[request.currentStoreKey].isProductPage();

    if (pageProduct) {
      console.log('IS PRODUCT PAGE!');
      setNewURL(request.newURL);

      const requestData = await Scrapers['MAGAZINE_LUIZA'].getRequestData();
      chrome.runtime.sendMessage(
        {
          event: Events.REQUEST_SEARCH_PRODUCT,
          productName: pageProduct.name,
          requestData,
        },
        (response) => {
          console.table(response);
        }
      );
    }
  }
});
