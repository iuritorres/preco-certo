import { Events } from "./constants/events"
import { scrapers } from "./scrapers"

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.event === Events.URL_CHANGE) {
    const isProductPage = await scrapers[
      request.targetScraperKey
    ].isProductPage()

    console.log("IS PRODUCT PAGE: ", isProductPage)
  }
})
