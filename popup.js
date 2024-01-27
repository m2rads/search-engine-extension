document.addEventListener('DOMContentLoaded', function() {
    var searchInput = document.getElementById('searchInput');
    var searchSvg = document.getElementById('magnifier');

    function handleSearch() {
        console.log('Searching for:', searchInput.value);
        let searchTerm = searchInput.value

        // Send the search Input to content script
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action: "search", searchTerm: searchTerm}, function(response) {
                if (response && !response.found) {
                    console.log("Search term not found on this page.");
                }
            });
        });
    }

    // Event listener for Enter key in the input field
    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            handleSearch();
        }
    });

    // Event listener for clicking the SVG
    searchSvg.addEventListener('click', handleSearch);
});