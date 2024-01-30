document.addEventListener('DOMContentLoaded', function() {
    var searchInput = document.getElementById('searchInput');
    var resultsContainer = document.getElementById("resultsContainer");

    if (!searchInput) {
        console.error('One or more elements are not found');
        return;
    }

    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            handleSearch()
        }
    });

});

function handleSearch() {
    let searchTerm = searchInput.value;
    console.log(`search term: ${searchTerm}`)
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