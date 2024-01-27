function searchAndHighlight(searchTerm) {
    if (!searchTerm) {
        return false;
    }

    const bodyText = document.body.innerText;
    if (bodyText.includes(searchTerm)) {
        // Create a regex for case-insensitive search
        const searchRegex = new RegExp(`(${searchTerm})`, 'gi');

        // Replace the first occurrence with highlighted text
        document.body.innerHTML = document.body.innerHTML.replace(searchRegex, '<span style="background-color: yellow;">$1</span>');

        return true;
    }

    return false;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "search") {
        const found = searchAndHighlight(request.searchTerm);
        sendResponse({ found: found });
    }
});
