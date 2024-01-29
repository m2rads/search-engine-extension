// DATA PLACEHOLDER
const searchResults = [
    { title: 'Routing: Loading UI and Streaming | Next.js', link: 'https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming' },
    { title: 'Learn Next.js: Streaming | Next.js', link: 'https://nextjs.org/learn/dashboard-app/streaming' },
];


document.addEventListener('DOMContentLoaded', function() {
    var searchInput = document.getElementById('searchInput');
    var resultsContainer = document.getElementById("resultsContainer");

    // custome search Engine
    const apiKey = 'AIzaSyC5AiwHvS3sqCzwMvpT9qzI7CPLNLt4jN0'; 
    const searchEngineId = 'e0c834723631f455c'; 
    const query = 'site:https://nextjs.org suspense';

    if (!searchInput || !resultsContainer) {
        console.error('One or more elements are not found');
        return;
    }

    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            let searchTerm = searchInput.value;
            console.log(`search term: ${searchTerm}`)

            searchGoogleCustomSearch(apiKey, searchEngineId, query, (error, results) => {
                if (error) {
                  console.error('Error:', error);
                } else {
                  console.log('Search Results:', results);
                  displaySearchResults(results);
                }
            });
        }
    });

});


function handleSearch() {
    let searchTerm = searchInput.value;

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "search", searchTerm: searchTerm}, function(response) {
            if (chrome.runtime.lastError) {
                console.error('Error:', chrome.runtime.lastError);
                return;
            }
            if (response && response.results.length > 0) {
                console.log(`response.results.length: ${response.results.length}`);
            } else {
                alert("Search term not found on this page.");
            }
        });
    });
}

function searchGoogleCustomSearch(apiKey, cx, query, callback) {
    const apiUrl = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&key=${apiKey}&cx=${cx}`;
  
    // Send a GET request to the API
    // fetch(apiUrl)
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error(`HTTP error! Status: ${response.status}`);
    //     }
    //     return response.json();
    //   })
    //   .then(data => {
    //     // Process the search results
    //     const searchResults = data.items || [];
    //     callback(null, searchResults);
    //   })
    //   .catch(error => {
    //     // Handle errors
    //     callback(error, null);
    //   });
    callback(null, searchResults); //delete after development
    return
}


function displaySearchResults(results) {
    const resultsContainer = document.getElementById('resultsContainer');
  
    // Check if the container exists
    if (!resultsContainer) {
      console.error('Results container not found.');
      return;
    }
  
    // Clear the container content
    resultsContainer.innerHTML = '';
  
    // Create a list to hold the search results
    const resultList = document.createElement('ul');
  
    // Loop through the search results and create list items with links
    results.forEach((result, index) => {
      const listItem = document.createElement('li');
      listItem.className = "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
      const link = document.createElement('a');
      link.href = result.link;
      link.textContent = result.title;
      listItem.appendChild(link);
      resultList.appendChild(listItem);
    });
  
    // Append the list of results to the container
    resultsContainer.appendChild(resultList);
}