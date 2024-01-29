chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  if (!tab.url) return;
  const url = new URL(tab.url);
  await chrome.sidePanel.setOptions({
    tabId,
    path: 'sidepanel.html',
    enabled: true
  });

  // await chrome.tabs.sendMessage(tabId, { action: "tabUrlUpdated", url: url.origin });

});
