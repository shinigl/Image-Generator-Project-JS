let searchText = document.getElementById('search');
let searchBtn = document.getElementById('btn');
let container = document.getElementById('image-cont');
let url = `https://api.unsplash.com/search/photos/?client_id=IwuwGZuEsbMF0ST4Vok_b2_UxkZ5-GuZgDOVF_TrmUE&query=`


async function getImage(query){
    try{
    let response = await fetch(`${url}${query}`);
    let data = await response.json();
    displayImage(data.results);
    }catch(error){
        console.error('Error:', error);
    }
}

searchBtn.addEventListener("click", ()=>{
    let query = searchText.value.trim() ;
    if(query){
        getImage(query);
    } else {
        alert('Please enter a search term');
    }
}) ;

function displayImage(data){
   container.innerHTML ='';
   
   //Image container div
   data.forEach(image =>{
   let card = document.createElement('div');
   card.classList.add('card');

   //Card content (Img and its src)
   let img = document.createElement('img');
   img.src = image.urls.small ;
   img.classList.add('image');

   //Create a link element for the image
   let link = document.createElement('a');
   link.href = image.links.html;
   link.textContent = image.user.name ;

   card.appendChild(img);
   card.appendChild(link);

   container.appendChild(card);
   })
}

