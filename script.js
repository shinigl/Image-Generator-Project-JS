let searchText = document.getElementById('search');
let searchBtn = document.getElementById('btn');
let container = document.getElementById('image-cont');
let moreBtn = document.getElementById('more'); // Get the 'Show more' button
let url = `https://api.unsplash.com/search/photos/?client_id=IwuwGZuEsbMF0ST4Vok_b2_UxkZ5-GuZgDOVF_TrmUE&query=`;
let currentPage = 1; // Track the current page of results
let query = ""; // Store the current search query


// Search button event listener
searchBtn.addEventListener("click", () => {
    query = searchText.value.trim();
    if (query) {
        // Reset the page number and clear the container for new search results
        currentPage = 1;
        container.innerHTML = ''; // Clear previous search results
        getImage(currentPage, query); // Fetch images for the first page
    } else {
        alert('Please enter a search term');
    }
});


// Function to fetch images
async function getImage(currentPage, query) {
    try {
        // Make the API request with the page number and per_page limit
        let response = await fetch(`${url}${query}&page=${currentPage}&per_page=10`); // Load 10 images per page
        let data = await response.json();
        console.log(data);
        
        // Show images and update the "Show More" button state
        displayImage(data.results);
        
        // If we have results, show the "Show More" button, otherwise hide it
        if (data.results.length > 0) {
            moreBtn.style.display = "block";
        } else {
            moreBtn.style.display = "none"; // Hide "Show More" button if no more results
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Display images in the container
function displayImage(data) {
    data.forEach(image => {
        let card = document.createElement('div');
        card.classList.add('card');

        let img = document.createElement('img');
        img.src = image.urls.small;
        img.classList.add('image');

        let link = document.createElement('a');
        link.href = image.links.html;
        link.textContent = image.user.name || 'Untitled';

        card.appendChild(img);
        card.appendChild(link);
        container.appendChild(card);
    });
}



// Show more button event listener
moreBtn.addEventListener("click", () => {
    currentPage++; 
    getImage(currentPage, query); // Fetch the next page of images
});


