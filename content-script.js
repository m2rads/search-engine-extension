function searchAndMark(searchTerm) {
    let count = 0;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    let node;

    while (node = walker.nextNode()) {
        if (node.textContent.toLowerCase().includes(searchTerm.toLowerCase())) {
            const parent = node.parentNode;
            const span = document.createElement('span');
            const anchorId = `searchResult${count}`;
            span.id = anchorId;
            span.innerHTML = node.textContent.replace(new RegExp(searchTerm, 'gi'), match => `<mark>${match}</mark>`);
            parent.replaceChild(span, node);
            count++;
        }
    }

    return count;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "search") {
        const count = searchAndMark(request.searchTerm);
        sendResponse({ count: count });
    }
});