chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  if (!tab.url) return;
  const tabUrl = new URL(tab.url)
  console.log(`tabUrl: ${tabUrl}`)
  await chrome.sidePanel.setOptions({
    tabId,
    path: 'sidepanel.html',
    enabled: true
  });

});


