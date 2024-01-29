chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "search") {
        const results = searchAndMark(request.searchTerm);
    }
});
