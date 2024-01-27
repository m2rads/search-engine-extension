document.addEventListener('DOMContentLoaded', function() {
    var searchInput = document.getElementById('searchInput');
    var searchSvg = document.getElementById('magnifier');

    function handleSearch() {
        console.log('Searching for:', searchInput.value);
        // TODO: Implement additional search functionality here if needed
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