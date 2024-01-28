document.addEventListener('DOMContentLoaded', function() {
    var searchInput = document.getElementById('searchInput');
    var searchSvg = document.getElementById('magnifier');
    var resultsContainer = document.getElementById("resultsContainer");

    if (!searchInput || !searchSvg || !resultsContainer) {
        console.error('One or more elements are not found');
        return;
    }

    function handleSearch() {
        let searchTerm = searchInput.value;

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action: "search", searchTerm: searchTerm}, function(response) {
                if (chrome.runtime.lastError) {
                    console.error('Error:', chrome.runtime.lastError);
                    return;
                }
                if (response && response.count > 0) {
                    displayResults(response.count, searchTerm);
                } else {
                    alert("Search term not found on this page.");
                }
            });
        });
    }

    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            handleSearch();
        }
    });

    searchSvg.addEventListener('click', handleSearch);

    function displayResults(count, searchTerm) {
        resultsContainer.innerHTML = '';
        for (let i = 0; i < count; i++) {
            const link = document.createElement('a');
            link.href = `#${searchTerm}${i}`;
            link.textContent = `Result ${i + 1}`;
            link.addEventListener('click', function() {
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    chrome.tabs.update(tabs[0].id, { url: link.href });
                });
            });
            resultsContainer.appendChild(link);
            resultsContainer.appendChild(document.createElement('br'));
        }
    }
});
