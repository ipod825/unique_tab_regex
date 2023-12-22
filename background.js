chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  const { url, tabId } = details;
  jumpToExistingTab(url, tabId);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    replaceExistingTab(tab.url, tab.id);
  }
});

async function replaceExistingTab(url, tabId) {
  let tabs = await chrome.tabs.query({});
  tabs.forEach((other) => {
    if (other.url == url && other.id !== tabId) {
      chrome.tabs.update(other.id, { active: true });
      chrome.tabs.remove(tabId);
    }
  });
}

async function jumpToExistingTab(url, tabId) {
  if (url == "") {
    return;
  }
  let tabs = await chrome.tabs.query({ url: url });

  if (tabs != null && tabs.length > 1) {
    const existingTab = tabs.find((t) => t.id !== tabId);
    if (existingTab) {
      chrome.tabs.update(existingTab.id, { active: true });
      chrome.tabs.remove(tabId);
    }
  }
}
