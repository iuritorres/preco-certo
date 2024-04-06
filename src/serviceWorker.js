// Worker that sends a massage to contentScript for every URL change
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  chrome.tabs.sendMessage(tabId, { message: "url_change" })
})
