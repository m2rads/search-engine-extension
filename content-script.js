function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function searchAndMark(searchTerm) {
    let count = 0;

    return count;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "search") {
        const count = searchAndMark(request.searchTerm);
        sendResponse({ count: count });
    }
});
