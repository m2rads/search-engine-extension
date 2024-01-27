function search(searchTerm) {
    if(!searchTerm) {
        return false 
    }

    const bodyText = document.body.innerText; 
    if (bodyText.includes(searchTerm)) {
        const searchRegex = new RegExp('(${searchTerm})', 'gi');

        document.body.innerHTML = document.body.innerHTML.replace(searchRegex, '<span style="background-color: yellow;">$1</span>');
        return true
    }

    return false
}

// Listen for search messages from the popup 
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "search") {
        const found = search(request.searchTerm); 
        sendResponse({ found: found })
    }
})