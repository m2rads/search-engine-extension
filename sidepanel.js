// DATA PLACEHOLDER
const searchResults = [
    {kind: 'customsearch#result', title: 'Learn Next.js: Streaming | Next.js', link: 'https://nextjs.org/learn/dashboard-app/streaming', displayLink: 'nextjs.org', cacheId: "XmJuNBpcjeMJ", htmlSnippet: "Built on top of <b>Suspense</b>, Loading UI allows you to create a fallback for specific route segments, and automatically stream content as it becomes ready.", },
    {kind: 'customsearch#result', title: 'Learn Next.js: Streaming | Next.js', link: 'https://nextjs.org/learn/dashboard-app/streaming', displayLink: 'nextjs.org', cacheId: "XmJuNBpcjeMJ", htmlSnippet: "Built on top of <b>Suspense</b>, Loading UI allows you to create a fallback for specific route segments, and automatically stream content as it becomes ready.", }
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

    // displaySearchResults(searchResults);

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
  
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Process the search results
        const searchResults = data.items || [];
        callback(null, searchResults);
      })
      .catch(error => {
        // Handle errors
        callback(error, null);
      });
    // callback(null, searchResults);
    return
}


function displaySearchResults(results) {
    const resultsContainer = document.getElementById('resultsContainer');
  
    if (!resultsContainer) {
      console.error('Results container not found.');
      return;
    }
  
    resultsContainer.innerHTML = '';
  
    const resultList = document.createElement('div');
  
    // Loop through the search results and create list items with links
    results.forEach((result, index) => {
      const listItem = document.createElement('div');
      const title = document.createElement('a');
      const description = document.createElement('p');
      const thumbnail = document.createElement('img');
      
      // ListItem container
      listItem.className = "flex flex-col space-y-1.5 p-6 rounded-xl border bg-card text-card-foreground shadow mt-5"
      
      // Items inside container
      console.log(`thumbnail: ${result.pagemap.cse_image} `)
    //   thumbnail.src = result.pagemap.cse_thumbnail[0];
    //   thumbnail.alt = "Thumbnail image"
    //   thumbnail.classList = ""
      
      title.href = result.link;
      title.textContent = result.title;
      title.className = "p-1 text-slate-300 font-semibold leading-none tracking-tight"
      
      description.textContent = result.htmlSnippet
      description.classList = "p-1 text-sm text-slate-400 text-muted-foreground"    

      listItem.appendChild(thumbnail);
      listItem.appendChild(title);
      listItem.appendChild(description)
      resultList.appendChild(listItem);
    });
  
    // Append the list of results to the container
    resultsContainer.appendChild(resultList);
}