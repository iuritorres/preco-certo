import { Events } from "./constants/events"
import { scrapers } from "./scrapers"

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  const currentDomain = new URL(tab.url).origin
  const availableDomains = Object.keys(scrapers).map(
    (scraperKey) => scrapers[scraperKey].baseUrl
  )

  if (availableDomains.includes(currentDomain)) {
    const targetScraperKey = Object.keys(scrapers).filter(
      (scraperKey) => scrapers[scraperKey].baseUrl === currentDomain
    )

    chrome.tabs.sendMessage(tabId, {
      event: Events.URL_CHANGE,
      targetScraperKey,
    })
  }
})
