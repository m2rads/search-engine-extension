const apiKey = 'AIzaSyC5AiwHvS3sqCzwMvpT9qzI7CPLNLt4jN0'; 
const searchEngineId = 'e0c834723631f455c'; 
let urlOrigin = ""

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if (request.action === "tabUrlUpdated") {
//         console.log(`url update: ${request.url}`)
//         urlOrigin = request.url;
//     }
// });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "tabUrlUpdated") {
        console.log(`url update: ${request.url}`)
        urlOrigin = request.url;
    }
  });

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "search") {
        const query = "site:" + urlOrigin + request.searchTerm
        console.log(`query: ${query}`)
        searchGoogleCustomSearch(apiKey, searchEngineId, query, (error, results) => {
            if (error) {
              console.error('Error:', error);
            } else {
              console.log('Search Results:', results);
              sendResponse( {results: results} )
            }
        });
    }
});

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
  